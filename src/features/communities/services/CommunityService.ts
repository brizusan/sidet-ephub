import {
  communityRepository,
  IcommunityRepository,
} from "./CommunityRepository";
import { CommunityInput } from "../schemas/communitySchema";
import { User } from "better-auth";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { notFound } from "next/navigation";

class CommunityService {
  constructor(private communityRepository: IcommunityRepository) {}

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

  async getCommunitiesDetails(communityId: string, user: User) {
    const community = await this.getCommunity(communityId);

    const isMember = false;
    const isAdmin = CommunityPolicy.isAdmin(user!, community);

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
}

export const communityService = new CommunityService(communityRepository);
