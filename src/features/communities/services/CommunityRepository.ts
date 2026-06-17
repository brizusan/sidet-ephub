import { db } from "@/src/db";
import { CreateCommunity, SelectCommunity } from "../types/community.types";
import { communities } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface IcommunityRepository {
  create(data: CreateCommunity): Promise<SelectCommunity>;
  findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
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
}

export const communityRepository = new CommunityRepository();
