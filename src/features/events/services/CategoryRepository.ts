import { db } from "@/src/db";
import { SelectCategory } from "../types/events.type";
import { category } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface ICategoryRepository {
  findAll(): Promise<SelectCategory[]>;
  findById(categoryId: string): Promise<SelectCategory>;
}
class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<SelectCategory[]> {
    const res = await db.select().from(category);
    return res;
  }

  async findById(categoryId: string): Promise<SelectCategory> {
    const [res] = await db
      .select()
      .from(category)
      .where(eq(category.id, categoryId))
      .limit(1);

    return res;
  }
}

export const categoryRepository = new CategoryRepository();
