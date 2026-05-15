import { db } from "@/lib/db";
import { RegisterUserDTO } from "@app-commemore/shared";
import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserRepo {
  async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: RegisterUserDTO & { role: Role }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { id },
    });
  }
}

export const userRepo = new UserRepo();
