"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";
import { error } from "console";
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
