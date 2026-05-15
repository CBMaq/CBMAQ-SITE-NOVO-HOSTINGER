"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/rbac";
import bcrypt from "bcrypt";

export async function updateProfile(data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  const session = await requireAuth();
  const userId = session.user.id;

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: updateData
    });
    revalidatePath("/admin/configuracoes");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar perfil. Verifique se o e-mail já está em uso." };
  }
}
