import { drizzle } from "drizzle-orm/node-postgres";
import { category } from "../schema";
import { categories } from "./data/category";

import "dotenv/config";

async function seed() {
  const db = drizzle(process.env.DATABASE_URL!);
  await db.insert(category).values(categories);

  console.log("datos ingresados de manera correcta");

  // pnpm run drizzle:seed
}

seed();
