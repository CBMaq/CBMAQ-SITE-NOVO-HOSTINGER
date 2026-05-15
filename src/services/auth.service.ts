import { RegisterUserDTO } from "@app-commemore/shared";
import { userRepo } from "../repositories/user.repo";
import { AppError } from "@/lib/errors";

export class AuthService {
  async register(data: RegisterUserDTO) {
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("A user with this email already exists.", "CONFLICT");
    }

    // Default to MEMBER upon registration
    const user = await userRepo.createUser({
      ...data,
      role: 'MEMBER'
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
