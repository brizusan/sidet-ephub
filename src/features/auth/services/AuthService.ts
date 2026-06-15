class AuthService {
  async registerUser(data: any) {
    console.log("Datos de registro desde service:", data);

    // Manejo de logica de Negocio , registro

    // Revisar usuario existente

    // Manejar el registro del usuario
  }
}

export const authService = new AuthService();
