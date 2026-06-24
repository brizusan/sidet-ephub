import { category, event, eventLocations } from "@/src/db/schema";

export type SelectCategory = typeof category.$inferSelect;

export type InsertBasicEvent = typeof event.$inferInsert;
export type InsertEventLocation = typeof eventLocations.$inferInsert;

export type SelectBasicEvent = typeof event.$inferSelect;
export type SelectEventLocation = typeof eventLocations.$inferSelect;

export type InsertEvent = InsertBasicEvent & {
  location?: Omit<InsertEventLocation, "eventId" | "id">;
};
