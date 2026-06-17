import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";

export class MembershipPolicy {
  static canJoin(
    user: User,
    community: SelectCommunity,
    isMember: boolean,
  ): boolean {
    if (isMember) return false;

    // administrador no se puede uni a comunidad

    if (community.createdBy === user.id) return false;

    return true;
  }

  static canLeave(
    user: User,
    community: SelectCommunity,
    isMember: boolean,
  ): boolean {
    // Owner no puede dejar comunidad

    if (community.createdBy === user.id) return false;

    return isMember;
  }
}
