import { communities } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CreateCommunity = InferInsertModel<typeof communities>;
export type SelectCommunity = InferSelectModel<typeof communities>;
