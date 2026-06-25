import { db } from "@/src/db";
import { event, eventLocations } from "@/src/db/schema";
import { InsertEvent, SelectEvent } from "../types/events.type";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

export interface IEventRepository {
  insert(data: InsertEvent): Promise<void>;
  findUpCommingByUser(userId: string): Promise<SelectEvent[]>;
  findById(id: string): Promise<SelectEvent | null>;
  update(data: InsertEvent, eventId: string): Promise<void>;
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

  async findUpCommingByUser(userId: string): Promise<SelectEvent[]> {
    const today = format(new Date(), "yyyy-MM-dd");
    const result = await db.query.event.findMany({
      where: {
        AND: [{ createdBy: { eq: userId } }, { date: { gte: today } }],
      },
      orderBy: {
        date: "asc",
      },
    });

    return result;
  }

  async findById(id: string): Promise<SelectEvent | null> {
    const result = await db.query.event.findFirst({
      where: {
        id,
      },
      with: {
        location: true,
      },
    });

    return result ?? null;
  }

  async update(data: InsertEvent, eventId: string): Promise<void> {
    const [updateEvent] = await db
      .update(event)
      .set(data)
      .where(eq(event.id, eventId))
      .returning();

    // Actualizar localizacion si el evento es prescencial
    if (!updateEvent.virtual && data.location) {
      const locationExist = await db.query.eventLocations.findFirst({
        where: {
          eventId: updateEvent.id,
        },
      });

      // acutliza si el estado cambia de presencial a virtual o viceversa
      if (locationExist) {
        await db
          .update(eventLocations)
          .set(data.location)
          .where(eq(eventLocations.eventId, updateEvent.id));
      } else {
        await db.insert(eventLocations).values({
          eventId: updateEvent.id,
          ...data.location,
        });
      }
    }
  }
}

export const eventRepository = new EventRepository();
