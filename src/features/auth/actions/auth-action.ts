"use server";
import { RegisterInput, RegisterSchema } from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function registerUser(data: RegisterInput) {
  const registerData = RegisterSchema.safeParse(data);

  if (!registerData.success) {
    return {
      error:
        "Error en el registro. Por favor, verifica tus datos e intenta nuevamente.",
      success: "",
    };
  }
  const validatedData = registerData.data;

  await authService.registerUser(validatedData);
}
