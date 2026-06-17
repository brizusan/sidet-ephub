import { db } from "@/src/db";
import { CreateCommunity, SelectCommunity } from "../types/community.types";
import { communities } from "@/src/db/schema";

export interface IcommunityRepository {
  create(data: CreateCommunity): Promise<SelectCommunity>;
}

class CommunityRepository implements IcommunityRepository {
  async create(data: CreateCommunity) {
    // const [result] =await db.insert(communities).values(data);
    // await db.insert(communities).values(data).returning() => muestra los datos ingresados
    const [result] = await db.insert(communities).values(data).returning();
    return result;
  }
}

export const communityRepository = new CommunityRepository();
