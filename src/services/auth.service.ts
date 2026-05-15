import { userRepo } from "../repositories/user.repo";
import { AppError } from "@/lib/errors";
import { Role, User } from "@prisma/client";

type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};

class AuthService {
  async register(data: RegisterUserDTO): Promise<User> {
    const existingUser = await userRepo.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Usuário já existe", 400);
    }

    return await userRepo.createUser({
      ...data,
      role: Role.USER,
    });
  }
}

export const authService = new AuthService();
