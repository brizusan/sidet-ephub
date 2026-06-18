"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";
import { success } from "zod";

export async function createCommunityAction(data: CommunityInput) {
  const validateData = CommunitySchema.safeParse(data);

  if (!validateData.success) {
    return {
      error: "Error en el envio de datos",
      succes: "",
    };
  }

  const { session } = await requireAuth();

  if (!session) {
    return {
      error: "Hubo un error",
      succes: "",
    };
  }

  await communityService.createCommunity(validateData.data, session.user.id);

  return {
    error: "",
    success: "Comunidad Registrada Correctamente",
  };
}

export async function updateCommunityAction(data: CommunityInput, id: string) {
  const { session } = await requireAuth();

  if (!session) {
    return {
      error: "Hubo un error",
      succes: "",
    };
  }

  const validateData = CommunitySchema.safeParse(data);

  if (!validateData.success) {
    return {
      error: "Error en el envio de datos",
      succes: "",
    };
  }

  await communityService.updateCommunity(validateData.data, id, session.user);

  return {
    succes: "Datos Actualizados correctamente",
    error: "",
  };
}
