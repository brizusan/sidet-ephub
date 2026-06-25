"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { EventInput, EventSchema } from "../schema/eventSchema";
import { eventService } from "../services/EventService";
import { error } from "console";

export async function createEventAction(dataInput: EventInput) {
  const { session } = await requireAuth();

  if (!session) {
    return {
      error: "No autenticado",
      success: "",
    };
  }

  const data = EventSchema.safeParse(dataInput);
  if (!data.success) {
    return {
      error: "Error en action",
      success: "",
    };
  }

  await eventService.createEvent(data.data, session.user);

  return {
    success: "Evento generado",
    error: "",
  };
}

export async function editEventAction(dataInput: EventInput, eventId: string) {
  const { session } = await requireAuth();

  if (!session) {
    return {
      error: "No Autenticado",
      success: "",
    };
  }

  const data = EventSchema.safeParse(dataInput);
  if (!data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  await eventService.updateEvent(eventId, data.data, session.user);
  return {
    success: "Datos actualizados",
    error: "",
  };
}
