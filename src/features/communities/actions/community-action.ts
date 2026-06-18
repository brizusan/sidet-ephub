"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";
import {
  CheckPasswordInput,
  CheckPasswordSchema,
} from "../../auth/schemas/authSchema";

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

export async function deleteCommunityAction(
  data: CheckPasswordInput,
  id: string,
) {
  const { session } = await requireAuth();

  if (!session) {
    return {
      error: "Hubo un error",
      succes: "",
    };
  }

  const validateData = CheckPasswordSchema.safeParse(data);

  console.log(validateData);

  if (!validateData.success) {
    return {
      error: "Error en el envio de datos",
      succes: "",
    };
  }

  const response = await communityService.deleteCommunity(
    validateData.data.password,
    session.user,
    id,
  );

  return response;
}
