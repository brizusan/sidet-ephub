import { auth } from "@/src/lib/auth";
import { RegisterInput } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";

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
}

export const authService = new AuthService(authRepository);
