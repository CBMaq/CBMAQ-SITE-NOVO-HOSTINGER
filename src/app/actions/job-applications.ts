"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getJobApplications() {
  try {
    const prisma = db as any;
    const applications = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return applications;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }
}

export async function updateJobApplicationStatus(id: string, status: string) {
  try {
    const prisma = db as any;
    await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/curriculos");
    return { success: true };
  } catch (error) {
    console.error("Error updating job application status:", error);
    return { success: false, error: "Falha ao atualizar status" };
  }
}

export async function updateJobApplicationNotes(id: string, notes: string) {
  try {
    const prisma = db as any;
    await prisma.jobApplication.update({
      where: { id },
      data: { internalNotes: notes },
    });
    revalidatePath("/admin/curriculos");
    return { success: true };
  } catch (error) {
    console.error("Error updating job application notes:", error);
    return { success: false, error: "Falha ao atualizar anotações" };
  }
}

export async function deleteJobApplication(id: string) {
  try {
    const prisma = db as any;
    await prisma.jobApplication.delete({
      where: { id },
    });
    revalidatePath("/admin/curriculos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting job application:", error);
    return { success: false, error: "Falha ao excluir candidatura" };
  }
}
