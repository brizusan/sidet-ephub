import { db } from "@/src/db";
import { communityMembers } from "@/src/db/schema";
import { and, count, eq, sql } from "drizzle-orm";
import { JoinedCommunity } from "../types/community.types";

export interface IMembershipRepository {
  addMember(communityId: string, userId: string): Promise<void>;
  removerMember(communityId: string, userId: string): Promise<void>;
  isMember(communityId: string, userId: string): Promise<boolean>;
  findJoinedCommunities(userId: string): Promise<JoinedCommunity[]>;
  getMembersCount(communityId: string): Promise<number>;
}

class MembershipRepository implements IMembershipRepository {
  async addMember(communityId: string, userId: string): Promise<void> {
    await db.insert(communityMembers).values({
      communityId,
      userId,
    });
  }

  async isMember(communityId: string, userId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(communityMembers)
      .where(
        and(
          eq(communityMembers.communityId, communityId),
          eq(communityMembers.userId, userId),
        ),
      );

    return !!result;
  }

  async removerMember(communityId: string, userId: string): Promise<void> {
    await db
      .delete(communityMembers)
      .where(
        and(
          eq(communityMembers.communityId, communityId),
          eq(communityMembers.userId, userId),
        ),
      );
  }

  async findJoinedCommunities(userId: string) {
    const res = await db.query.communityMembers.findMany({
      where: {
        userId,
      },
      with: {
        communities: true,
        user: true,
      },
    });

    return res;
  }

  async getMembersCount(communityId: string): Promise<number> {
    const [result] = await db
      .select({ total: count() })
      .from(communityMembers)
      .where(eq(communityMembers.communityId, communityId)); // Filtra solo por la comunidad

    return result.total;
  }
}

export const membershipRepository = new MembershipRepository();
