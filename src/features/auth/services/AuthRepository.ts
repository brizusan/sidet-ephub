import { db } from "@/src/db";
import { RegisterInput } from "../schemas/authSchema";
import { User } from "../types/auth.types";

export interface IAuthRepository {
  userExists(email: RegisterInput["email"]): Promise<User | undefined>;
}

class AuthRepository implements IAuthRepository {
  async userExists(email: RegisterInput["email"]) {
    const user = await db.query.users.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}

export const authRepository = new AuthRepository();
