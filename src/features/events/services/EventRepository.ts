import { db } from "@/src/db";
import { event, eventLocations } from "@/src/db/schema";
import { InsertEvent } from "../types/events.type";

export interface IEventRepository {
  insert(data: InsertEvent): Promise<void>;
}

class EventRepository implements IEventRepository {
  async insert(data: InsertEvent): Promise<void> {
    const [insertedEvent] = await db.insert(event).values(data).returning();

    if (!insertedEvent.virtual && data.location) {
      await db.insert(eventLocations).values({
        eventId: insertedEvent.id,
        ...data.location,
      });
    }
  }
}

export const eventRepository = new EventRepository();
