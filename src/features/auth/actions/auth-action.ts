"use server";

import {
  ForgotInput,
  ForgotSchema,
  LoginInput,
  LoginSchema,
  RegisterInput,
  RegisterSchema,
  ResePasswordInput,
  ResetPasswordSchema,
} from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function registerUserAction(data: RegisterInput) {
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

export async function LoginUserAction(data: LoginInput) {
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

export async function ForgotPasswordAction(data: ForgotInput) {
  const forgotData = ForgotSchema.safeParse(data);

  if (!forgotData) {
    return {
      error: "Error en loas valores de ingreso , verifica los datos",
      success: "",
    };
  }

  const validateData = forgotData.data;
  const response = await authService.forgotPasswordUser(validateData!);
  return response;
}

export async function ResetPasswordAction(
  data: ResePasswordInput,
  token: string,
) {
  const resetData = ResetPasswordSchema.safeParse(data);

  if (!resetData) {
    return {
      error: "Error en loas valores de ingreso , verifica los datos",
      success: "",
    };
  }

  const validateData = resetData.data!;

  const response = await authService.confirmPasswordReset(validateData, token);
  return response;
}
