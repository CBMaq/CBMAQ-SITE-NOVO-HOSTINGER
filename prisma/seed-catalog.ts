import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bucketUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  // --- CATEGORIAS ---
  const categories = [
    {
      name: "Escavadeiras Hidráulicas",
      slug: "escavadeiras-hidraulicas",
      description: "Versáteis e eficientes em terrenos difíceis, ideais para movimentação de terra e rochas.",
      coverImage: bucketUrl + "zyc-8762-copy.webp",
      order: 1,
    },
    {
      name: "Retroescavadeiras",
      slug: "retroescavadeiras",
      description: "Desempenho ágil e robustez para projetos de alta exigência.",
      coverImage: bucketUrl + "dsc01851-copy.webp",
      order: 2,
    },
    {
      name: "Pás Carregadeiras",
      slug: "pas-carregadeiras",
      description: "Alta potência e excelente custo-benefício para agilizar sua operação.",
      coverImage: bucketUrl + "84-copy.webp",
      order: 3,
    },
  ];

  for (const cat of categories) {
    await prisma.catalogCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // --- MARCAS ---
  const brands = [
    {
      name: "AMMANN",
      slug: "ammann",
      logo: bucketUrl + "marca-parceira-ammann.png",
      coverImage: bucketUrl + "zyc-8762-copy.webp",
      description: "Líder global em usinas de asfalto e equipamentos de compactação com tecnologia suíça.",
      order: 1,
    },
    {
      name: "LOVOL",
      slug: "lovol",
      logo: bucketUrl + "logocat-lovol.png",
      coverImage: bucketUrl + "marca-parceira-lovol1.webp",
      description: "Excelência em tratores e máquinas agrícolas com alto desempenho e economia.",
      order: 2,
    },
    {
      name: "MAHINDRA",
      slug: "mahindra",
      logo: bucketUrl + "marca-parceira-mahindra.png",
      coverImage: bucketUrl + "marca-parceira-mahindra1.webp",
      description: "A força da maior fabricante de tratores do mundo presente na sua operação.",
      order: 3,
    },
    {
      name: "MULLER",
      slug: "muller",
      logo: bucketUrl + "logo-muller-branca.png",
      coverImage: bucketUrl + "logo-muller-branca.png",
      description: "Referência nacional em máquinas pesadas, com tradição, robustez e alta performance em obras por todo o Brasil.",
      order: 4,
    },
  ];

  for (const brand of brands) {
    await prisma.catalogBrand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
