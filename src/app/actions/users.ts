"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/rbac";
import bcrypt from "bcrypt";

export async function getUsers() {
  await requireAuth(["ADMIN"]);
  return await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      permissions: true,
      createdAt: true,
    }
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "WRITER";
  permissions: string[];
}) {
  await requireAuth(["ADMIN"]);
  
  const hashedPassword = data.password 
    ? await bcrypt.hash(data.password, 10) 
    : undefined;

  try {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        permissions: data.permissions,
        isActive: true,
      }
    });
    revalidatePath("/admin/usuarios");
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: "Erro ao criar usuário. Email já pode estar em uso." };
  }
}

export async function updateUserPermissions(id: string, permissions: string[]) {
  await requireAuth(["ADMIN"]);
  
  try {
    await db.user.update({
      where: { id },
      data: { permissions },
    });
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar permissões do usuário." };
  }
}

export async function updateUser(id: string, data: {
  name: string;
  email: string;
  password?: string;
  permissions: string[];
}) {
  await requireAuth(["ADMIN"]);
  
  try {
    const updateData: any = {
      name: data.name,
      email: data.email,
      permissions: data.permissions,
    };

    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
    });
    
    revalidatePath("/admin/usuarios");
    return { success: true, data: updatedUser };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar usuário. O email pode já estar em uso." };
  }
}

export async function toggleUserStatus(id: string, active: boolean) {
  await requireAuth(["ADMIN"]);
  
  try {
    await db.user.update({
      where: { id },
      data: { isActive: active }
    });
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao alterar status do usuário." };
  }
}

export async function deleteUser(id: string) {
  const session = await requireAuth(["ADMIN"]);
  
  // Impedir que o admin se exclua
  if (id === session.user.id) {
    return { success: false, error: "Você não pode excluir seu próprio usuário." };
  }

  try {
    await db.user.delete({
      where: { id }
    });
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir usuário." };
  }
}
