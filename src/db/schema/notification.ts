import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const notifications = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  actorName: varchar("actor_name", { length: 100 }).notNull(),
  message: varchar("message", { length: 100 }).notNull(),
  target: varchar("target", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  read:boolean().default(false)
});
