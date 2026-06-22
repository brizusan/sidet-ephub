import { User } from "better-auth";
import {
  IMembershipRepository,
  membershipRepository,
} from "./MemberShipRepository";
import {
  communityRepository,
  IcommunityRepository,
} from "./CommunityRepository";
import { notFound } from "next/navigation";
import { MembershipPolicy } from "../policies/MembershipPolicy";

class MemberShipService {
  constructor(
    private membershipRepository: IMembershipRepository,
    private communityRepository: IcommunityRepository,
  ) {}

  async toogleMembership(communityId: string, user: User) {
    // Revisar si la comunidad existe

    const community = await this.communityRepository.findById(communityId);

    if (!community) notFound();
    // ususario ya es miembro ?
    const isMember = await this.membershipRepository.isMember(
      community.id,
      user.id,
    );

    if (MembershipPolicy.canJoin(user, community, isMember)) {
      console.log("usuasrio se puede unir");
      // Si se le permite unirse
      await this.membershipRepository.addMember(communityId, user.id);

      return {
        sucess: true,
        message: `Te has unido a la comunidad  ${community.name}`,
        newPermissions: {
          canJoin: false,
          canLeave: true,
        },
      };
    }

    // usuario puede salirse
    if (MembershipPolicy.canLeave(user, community, isMember)) {
      await this.membershipRepository.removerMember(community.id, user.id);
      return {
        sucess: true,
        message: `Dejando la comunidad  ${community.name}`,
        newPermissions: {
          canJoin: true,
          canLeave: false,
        },
      };
    }
  }
}

export const membershipService = new MemberShipService(
  membershipRepository,
  communityRepository,
);
