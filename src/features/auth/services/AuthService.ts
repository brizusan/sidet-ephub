import { auth } from "@/src/lib/auth";
import {
  ForgotInput,
  LoginInput,
  RegisterInput,
  ResePasswordInput,
} from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async registerUser(data: RegisterInput) {
    const { email, password, name } = data;

    // Manejo de logica de Negocio , registro

    // Revisar usuario existente
    const userExists = await this.authRepository.userExists(email);
    if (userExists) {
      return {
        success: "",
        error: "Usuario duplicado , email asociado se encuentra registrado",
      };
    }
    // Manejar el registro del usuario

    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });

    return {
      success: "Usuario registrado exitosamente. Revisa tu correo",
      error: "",
    };
  }

  async signinUser(data: LoginInput) {
    const { password, email } = data;
    // REVISAR QUE USUARIO EXISTA
    const userExists = await this.authRepository.userExists(email);
    if (!userExists) {
      return {
        success: "",
        error: "Usuario no encontrado",
      };
    }

    // VALIDAR CREEDENCIALES Password y contraseña

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: "/dashboard",
        },
        headers: await headers(),
      });

      return {
        error: "",
        success: "Iniciando Sesión",
      };
    } catch (error) {
      if (error instanceof APIError) {
        const messages: Record<number, string> = {
          401: "Password incorrecto",
          403: "No autorizado , verifica tu cuenta",
        };

        const errorMessage = messages[error.statusCode];
        if (errorMessage) {
          return {
            success: "",
            error: errorMessage,
          };
        }
      }

      return {
        success: "",
        error: "",
      };
    }
  }

  async forgotPasswordUser(data: ForgotInput) {
    const { email } = data;
    const userExists = await this.authRepository.userExists(email);
    if (!userExists) {
      return {
        success: "",
        error: "No tenemos registrado el correo ingresado",
      };
    }

    await auth.api.requestPasswordReset({
      body: {
        email,
      },
    });

    return {
      success: "Hemos enviado un email con instrucciones",
      error: "",
    };
  }

  async confirmPasswordReset(data: ResePasswordInput, token: string) {
    const { newPassword } = data;
    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token,
        },
      });

      return {
        error: " ",
        success: "Contraseña actualizada correctamente",
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          error: "Token invalido o vencido",
          success: " ",
        };
      }
    }

    return {
      error: "",
      success: "",
    };
  }
}

export const authService = new AuthService(authRepository);
