import { db } from "@/lib/db";
import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";

type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};

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
