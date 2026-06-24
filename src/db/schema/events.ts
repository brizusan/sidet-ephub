import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  time,
  date,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { communities } from "./community";
import { users } from "./auth-schema";

export const event = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  details: text("details").notNull(),
  availableSeats: integer("available_seats").notNull(),
  date: date("date", { mode: "string" }).notNull(),
  time: time("time").notNull(),
  image: varchar("image", { length: 100 }).notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id").notNull(),
  createdBy: text("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  virtual: boolean("virtual").default(false).notNull(),
});

export const eventLocations = pgTable("event_locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  placeName: varchar("place_name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  lat: doublePrecision("latitude").notNull(),
  lng: doublePrecision("longitude").notNull(),
});
