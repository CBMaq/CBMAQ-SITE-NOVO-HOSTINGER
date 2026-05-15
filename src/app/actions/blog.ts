"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/rbac";
import slugify from "slugify";

// Utilitário para gerar slug em português
function generateSlug(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: "pt",
  });
}

// CATEGORIAS
export async function getCategories() {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.category.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    },
    orderBy: { name: "asc" }
  });
}

export async function createCategory(name: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  const slug = generateSlug(name);
  
  try {
    const category = await db.category.create({
      data: { name, slug }
    });
    revalidatePath("/admin/categorias");
    return { success: true, data: category };
  } catch (error) {
    return { success: false, error: "Erro ao criar categoria. Talvez ela já exista." };
  }
}

export async function deleteCategory(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.category.delete({
      where: { id }
    });
    revalidatePath("/admin/categorias");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir categoria." };
  }
}

// TAGS
export async function getTags() {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.tag.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    },
    orderBy: { name: "asc" }
  });
}

export async function createTag(name: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  const slug = generateSlug(name);
  
  try {
    const tag = await db.tag.create({
      data: { name, slug }
    });
    revalidatePath("/admin/tags");
    return { success: true, data: tag };
  } catch (error) {
    return { success: false, error: "Erro ao criar tag. Talvez ela já exista." };
  }
}

export async function deleteTag(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.tag.delete({
      where: { id }
    });
    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir tag." };
  }
}

// POSTAGENS
export async function getPosts() {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.post.findMany({
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getPostBySlug(slug: string) {
  return await db.post.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: true
    }
  });
}

export async function getPostById(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.post.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true
    }
  });
}

export async function createPost(data: {
  title: string;
  content: string;
  summary?: string;
  coverImage?: string;
  categoryId?: string;
  tagIds?: string[];
  published?: boolean;
}) {
  const session = await requireAuth(["ADMIN", "WRITER"]);
  
  let slug = generateSlug(data.title);
  
  // Garantir slug único
  const existing = await db.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  try {
    const post = await db.post.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        summary: data.summary,
        coverImage: data.coverImage,
        published: data.published || false,
        publishedAt: data.published ? new Date() : null,
        authorId: session.user.id,
        categoryId: data.categoryId,
        tags: {
          connect: data.tagIds?.map(id => ({ id }))
        }
      }
    });

    revalidatePath("/admin/postagens");
    revalidatePath("/blog");
    return { success: true, data: post };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao criar postagem." };
  }
}

export async function updatePost(id: string, data: {
  title: string;
  content: string;
  summary?: string;
  coverImage?: string;
  categoryId?: string;
  tagIds?: string[];
  published?: boolean;
}) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    const post = await db.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        summary: data.summary,
        coverImage: data.coverImage,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        categoryId: data.categoryId,
        tags: {
          set: data.tagIds?.map(id => ({ id }))
        }
      }
    });

    revalidatePath("/admin/postagens");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, data: post };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar postagem." };
  }
}

export async function deletePost(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.post.delete({
      where: { id }
    });
    revalidatePath("/admin/postagens");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir postagem." };
  }
}
