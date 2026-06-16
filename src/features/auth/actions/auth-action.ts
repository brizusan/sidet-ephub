"use server";
import { success } from "zod";
import {
  LoginInput,
  LoginSchema,
  RegisterInput,
  RegisterSchema,
} from "../schemas/authSchema";
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

  const response = await authService.registerUser(validatedData);
  return response;
}

export async function LoginUser(data: LoginInput) {
  const loginData = LoginSchema.safeParse(data);

  if (!loginData.success) {
    return {
      error: "Error en loas valores de ingreso , verifica los datos",
      success: "",
    };
  }

  const validateData = loginData.data;
  const response = await authService.signinUser(validateData);
  return response;
}
