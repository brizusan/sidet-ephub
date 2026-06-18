import { db } from "@/src/db";
import { CreateCommunity, SelectCommunity } from "../types/community.types";
import { communities } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { CommunityInput } from "../schemas/communitySchema";

export interface IcommunityRepository {
  create(data: CreateCommunity): Promise<SelectCommunity>;
  findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
  findById(communityId: string): Promise<SelectCommunity | undefined>;
  updateCommunity(data: CommunityInput, communityId: string): Promise<void>;
}

class CommunityRepository implements IcommunityRepository {
  async create(data: CreateCommunity) {
    // const [result] =await db.insert(communities).values(data);
    // await db.insert(communities).values(data).returning() => muestra los datos ingresados
    const [result] = await db.insert(communities).values(data).returning();
    return result;
  }

  async findByUser(userId: string, limit = 10): Promise<SelectCommunity[]> {
    const comunidades = await db
      .select()
      .from(communities)
      .where(eq(communities.createdBy, userId))
      .limit(limit);

    return comunidades;
  }

  async findById(communityId: string): Promise<SelectCommunity | undefined> {
    const [result] = await db
      .select()
      .from(communities)
      .where(eq(communities.id, communityId))
      .limit(1);

    return result;
  }

  async updateCommunity(
    data: CommunityInput,
    communityId: string,
  ): Promise<void> {
    await db
      .update(communities)
      .set({
        name: data.name,
        description: data.description,
        imageUrl: data.image,
      })
      .where(eq(communities.id, communityId));
  }
}

export const communityRepository = new CommunityRepository();
