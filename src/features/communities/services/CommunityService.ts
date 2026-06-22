import {
  communityRepository,
  IcommunityRepository,
} from "./CommunityRepository";
import { CommunityInput } from "../schemas/communitySchema";
import { User } from "better-auth";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { notFound } from "next/navigation";
import { checkPassword } from "@/src/shared/utils/auth-password";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";
import {
  IMembershipRepository,
  membershipRepository,
} from "./MemberShipRepository";

class CommunityService {
  constructor(
    private communityRepository: IcommunityRepository,
    private membershipRepository: IMembershipRepository,
  ) {}

  async createCommunity(data: CommunityInput, userId: string): Promise<void> {
    await this.communityRepository.create({
      ...data,
      createdBy: userId,
      imageUrl: data.image,
    });
  }

  async getUserCommunities(user: User) {
    const communities = await this.communityRepository.findByUser(user.id);
    const enriched = await Promise.all(
      communities.map(async (community) => {
        const isMember = true;
        const isAdmin = CommunityPolicy.isAdmin(user, community);

        return {
          data: community,
          context: {
            isMember,
            isAdmin,
          },
          permissions: {
            canEdit: CommunityPolicy.canEdit(user, community),
            canDelete: CommunityPolicy.canEdit(user, community),
            canJoin: MembershipPolicy.canJoin(user, community, isMember),
            canLeave: MembershipPolicy.canLeave(user, community, isMember),
          },
        };
      }),
    );

    return enriched;
  }

  async getCommunity(communityId: string) {
    const community = await this.communityRepository.findById(communityId);
    if (!community) notFound();
    return community;
  }

  async getCommunitiesDetails(communityId: string, user?: User) {
    const community = await this.getCommunity(communityId);

    if (!user) {
      return {
        data: community,
        context: null,
        permissions: null,
      };
    }

    const isMember = await this.membershipRepository.isMember(
      communityId,
      user.id,
    );
    const isAdmin = CommunityPolicy.isAdmin(user, community);

    return {
      data: community,
      context: {
        isMember,
        isAdmin,
      },
      permissions: {
        canEdit: CommunityPolicy.canEdit(user, community),
        canDelete: CommunityPolicy.canEdit(user, community),
        canJoin: MembershipPolicy.canJoin(user, community, isMember),
        canLeave: MembershipPolicy.canLeave(user, community, isMember),
      },
    };
  }

  async updateCommunity(data: CommunityInput, communityId: string, user: User) {
    const community = await this.getCommunity(communityId);

    if (!CommunityPolicy.canEdit(user, community)) {
      throw new Error("No tienes permiso para realizar la acción");
    }

    await this.communityRepository.updateCommunity(data, community.id);
  }

  async deleteCommunity(password: string, user: User, communityId: string) {
    // Obtener comunidad
    const community = await this.getCommunity(communityId);
    // Revisar Permisos
    if (!CommunityPolicy.canDelete(user, community)) {
      throw new Error("No tienes permisos para realizar la siguiente accion");
    }
    // Verificar Password
    const isValidPassword = await checkPassword(password);
    if (!isValidPassword) {
      return {
        error: "Contraseña Incorrecta",
        succes: "",
      };
    }

    // Eliminar Comunidad
    await this.communityRepository.delete(communityId);
    // Eliminando imagen de uploadthing
    await deleteUTFiles(community.imageUrl);

    return {
      error: "",
      succes: "Comunidad Eliminada",
    };
  }
}

export const communityService = new CommunityService(
  communityRepository,
  membershipRepository,
);
