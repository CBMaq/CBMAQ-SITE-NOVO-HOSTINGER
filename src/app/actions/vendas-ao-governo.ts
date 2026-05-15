"use server";

import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAtas() {
  return await prisma.ataRegistro.findMany({
    orderBy: { createdAt: "desc" },
    include: { arquivos: true },
  });
}

export async function getAtaById(id: string) {
  return await prisma.ataRegistro.findUnique({
    where: { id },
    include: { arquivos: { orderBy: { ordem: 'asc' } } },
  });
}

export async function createAta(data: any, arquivos: any[]) {
  const novaAta = await prisma.ataRegistro.create({
    data: {
      ...data,
      arquivos: {
        create: arquivos,
      },
    },
  });
  
  revalidatePath("/admin/vendas-ao-governo");
  revalidatePath("/vendas-ao-governo");
  return novaAta;
}

export async function updateAta(id: string, data: any, arquivos: any[]) {
  // Update main ata
  await prisma.ataRegistro.update({
    where: { id },
    data,
  });

  // Handle files: delete all existing and insert new ones to keep it simple for now, 
  // or use a smarter merge if we had IDs. Since it's a simple relationship, deleting and recreating is easiest.
  // Wait, if they are already uploaded to Supabase, we just need to keep their references.
  await prisma.ataRegistroArquivo.deleteMany({
    where: { ataRegistroId: id },
  });

  if (arquivos && arquivos.length > 0) {
    await prisma.ataRegistroArquivo.createMany({
      data: arquivos.map(arq => ({ ...arq, ataRegistroId: id })),
    });
  }

  revalidatePath("/admin/vendas-ao-governo");
  revalidatePath("/vendas-ao-governo");
  revalidatePath(`/vendas-ao-governo/atas/${data.slug}`);
}

export async function deleteAta(id: string) {
  await prisma.ataRegistro.delete({
    where: { id },
  });
  
  revalidatePath("/admin/vendas-ao-governo");
  revalidatePath("/vendas-ao-governo");
}
