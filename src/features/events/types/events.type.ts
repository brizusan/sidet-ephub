import { category, event, eventLocations } from "@/src/db/schema";
import { SelectCommunity } from "../../communities/types/community.types";
import { User } from "better-auth";

export type SelectCategory = typeof category.$inferSelect;

export type InsertBasicEvent = typeof event.$inferInsert;
export type InsertEventLocation = typeof eventLocations.$inferInsert;

export type SelectBasicEvent = typeof event.$inferSelect;
export type SelectEventLocation = typeof eventLocations.$inferSelect;

export type InsertEvent = InsertBasicEvent & {
  location?: Omit<InsertEventLocation, "eventId" | "id">;
};

export type SelectEvent = SelectBasicEvent & {
  location?: SelectEventLocation | null;
};

export type FullEvent = SelectBasicEvent & {
  location?: SelectEventLocation | null;
  category: SelectCategory;
  communities: SelectCommunity;
  admin: User;
};
