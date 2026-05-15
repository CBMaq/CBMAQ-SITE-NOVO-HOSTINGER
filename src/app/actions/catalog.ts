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

// --- CATEGORIAS ---

export async function getCatalogCategories() {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.catalogCategory.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { order: "asc" }
  });
}

export async function getPublicCategories() {
  return await db.catalogCategory.findMany({
    where: { active: true },
    include: {
      products: {
        where: { active: true },
        select: {
          brand: {
            select: {
              logo: true,
              name: true
            }
          }
        }
      }
    },
    orderBy: { order: "asc" }
  });
}

export async function createCatalogCategory(data: {
  name: string;
  description?: string;
  coverImage?: string;
  icon?: string;
  order?: number;
  active?: boolean;
}) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  let slug = generateSlug(data.name);
  const existing = await db.catalogCategory.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  try {
    const category = await db.catalogCategory.create({
      data: {
        ...data,
        slug
      }
    });
    revalidatePath("/admin/catalogo/categorias");
    return { success: true, data: category };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao criar categoria." };
  }
}

export async function updateCatalogCategory(id: string, data: any) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    const category = await db.catalogCategory.update({
      where: { id },
      data
    });
    revalidatePath("/admin/catalogo/categorias");
    return { success: true, data: category };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar categoria." };
  }
}

export async function deleteCatalogCategory(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.catalogCategory.delete({
      where: { id }
    });
    revalidatePath("/admin/catalogo/categorias");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir categoria." };
  }
}

// --- MARCAS ---

export async function getCatalogBrands() {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.catalogBrand.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { order: "asc" }
  });
}

export async function getPublicBrands() {
  return await db.catalogBrand.findMany({
    where: { active: true },
    orderBy: { order: "asc" }
  });
}

export async function createCatalogBrand(data: {
  name: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  order?: number;
  active?: boolean;
}) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  let slug = generateSlug(data.name);
  const existing = await db.catalogBrand.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  try {
    const brand = await db.catalogBrand.create({
      data: {
        ...data,
        slug
      }
    });
    revalidatePath("/admin/catalogo/marcas");
    return { success: true, data: brand };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao criar marca." };
  }
}

export async function updateCatalogBrand(id: string, data: any) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    const brand = await db.catalogBrand.update({
      where: { id },
      data
    });
    revalidatePath("/admin/catalogo/marcas");
    return { success: true, data: brand };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar marca." };
  }
}

export async function deleteCatalogBrand(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.catalogBrand.delete({
      where: { id }
    });
    revalidatePath("/admin/catalogo/marcas");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir marca." };
  }
}

// --- PRODUTOS ---

export async function getCatalogProducts(productType?: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  const where: any = {};
  if (productType) {
    where.productType = productType;
  }
  return await db.catalogProduct.findMany({
    where,
    include: {
      brand: { select: { name: true } },
      category: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getCatalogProductById(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  return await db.catalogProduct.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true
    }
  });
}

export async function createCatalogProduct(data: any) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  let slug = data.slug || generateSlug(data.name);
  
  // Garantir que o slug é único
  const existing = await db.catalogProduct.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  // Sanitizar brandId e categoryId (converter "" em null) para evitar erro de constraint
  const sanitizedData = {
    ...data,
    brandId: data.brandId === "" ? null : data.brandId,
    categoryId: data.categoryId === "" ? null : data.categoryId,
  };

  try {
    const product = await db.catalogProduct.create({
      data: {
        ...sanitizedData,
        slug
      }
    });
    revalidatePath("/admin/catalogo/produtos");
    return { success: true, data: product };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao criar produto." };
  }
}

export async function updateCatalogProduct(id: string, data: any) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  // Sanitizar brandId e categoryId (converter "" em null) para evitar erro de constraint
  const sanitizedData = {
    ...data,
    brandId: data.brandId === "" ? null : data.brandId,
    categoryId: data.categoryId === "" ? null : data.categoryId,
  };

  try {
    const product = await db.catalogProduct.update({
      where: { id },
      data: sanitizedData
    });
    revalidatePath("/admin/catalogo/produtos");
    return { success: true, data: product };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar produto." };
  }
}

export async function deleteCatalogProduct(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.catalogProduct.delete({
      where: { id }
    });
    revalidatePath("/admin/catalogo/produtos");
    revalidatePath("/admin/catalogo/motores");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir produto." };
  }
}

export async function deleteManyCatalogProducts(ids: string[]) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    await db.catalogProduct.deleteMany({
      where: { id: { in: ids } }
    });
    revalidatePath("/admin/catalogo/produtos");
    revalidatePath("/admin/catalogo/motores");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao excluir produtos." };
  }
}

export async function toggleCatalogProductStatus(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    const current = await db.catalogProduct.findUnique({
      where: { id },
      select: { active: true }
    });
    
    if (!current) return { success: false, error: "Produto não encontrado." };
    
    const product = await db.catalogProduct.update({
      where: { id },
      data: { active: !current.active }
    });
    
    revalidatePath("/admin/catalogo/produtos");
    revalidatePath("/admin/catalogo/motores");
    return { success: true, active: product.active };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao alternar status." };
  }
}

export async function duplicateCatalogProduct(id: string) {
  await requireAuth(["ADMIN", "WRITER"]);
  
  try {
    const original = await db.catalogProduct.findUnique({
      where: { id }
    });
    
    if (!original) return { success: false, error: "Produto não encontrado." };
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, slug: __, createdAt: ___, updatedAt: ____, ...data } = original;
    
    const newName = `${original.name} (Cópia)`;
    let newSlug = generateSlug(newName);
    
    const existing = await db.catalogProduct.findUnique({ where: { slug: newSlug } });
    if (existing) newSlug = `${newSlug}-${Date.now()}`;
    
    const duplicated = await db.catalogProduct.create({
      data: {
        ...(data as any),
        name: newName,
        slug: newSlug,
        active: false,
      }
    });
    
    revalidatePath("/admin/catalogo/produtos");
    return { success: true, data: duplicated };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao duplicar produto." };
  }
}

// --- PÚBLICO ---

export async function getPublicFilteredProducts(filters: {
  categories?: string[];
  brands?: string[];
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const { categories, brands, search, type, page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  const where: any = {
    active: true,
  };

  if (categories && categories.length > 0) {
    where.category = {
      slug: { in: categories }
    };
  }

  if (brands && brands.length > 0) {
    where.brand = {
      slug: { in: brands }
    };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } }
    ];
  }

  if (type) {
    where.productType = type;
  }

  const [products, total] = await Promise.all([
    db.catalogProduct.findMany({
      where,
      include: {
        brand: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.catalogProduct.count({ where })
  ]);

  return {
    products,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  };
}

export async function getPublicProductBySlug(slug: string) {
  const product = await db.catalogProduct.findUnique({
    where: { slug, active: true },
    include: {
      brand: true,
      category: true,
    }
  });

  if (!product) return null;

  // Buscar produtos relacionados se houver IDs salvos
  let relatedProducts: any[] = [];
  if (product.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.length > 0) {
    relatedProducts = await db.catalogProduct.findMany({
      where: {
        id: { in: product.relatedProducts as string[] },
        active: true
      },
      include: {
        brand: true,
        category: true
      }
    });
  }

  // Fallback: Se não houver relacionados manuais, buscar pela mesma categoria
  if (relatedProducts.length === 0 && product.categoryId) {
    relatedProducts = await db.catalogProduct.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        active: true
      },
      take: 3,
      include: {
        brand: true,
        category: true
      }
    });
  }

  return {
    product,
    relatedProducts
  };
}

export async function getPublicFeaturedProducts() {
  return await db.catalogProduct.findMany({
    where: { 
      active: true,
      featured: true
    },
    include: {
      brand: true,
      category: true
    },
    orderBy: { order: "asc" }
  });
}

export async function getPublicEngines() {
  return await db.catalogProduct.findMany({
    where: {
      active: true,
      productType: "engine"
    },
    include: {
      brand: true,
      category: true
    },
    orderBy: { order: "asc" }
  });
}
