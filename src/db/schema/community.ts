import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";

export const communities = pgTable("communities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: text("created_by").notNull(),
});

export const communityMembers = pgTable("community_Members", {
  communityId: uuid("community_id")
    .references(() => communities.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});
