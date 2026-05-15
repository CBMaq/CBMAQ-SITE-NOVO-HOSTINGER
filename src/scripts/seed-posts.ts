import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed de postagens REAIS...");

  const admin = await prisma.user.findUnique({
    where: { email: "villardiital.bkp@gmail.com" }
  });

  if (!admin) {
    console.error("Erro: Usuário admin não encontrado.");
    return;
  }

  // 1. Categorias de Verdade
  const catPecas = await prisma.category.upsert({
    where: { slug: "pecas-e-componentes" },
    update: { name: "Peças e Componentes" },
    create: { name: "Peças e Componentes", slug: "pecas-e-componentes" }
  });

  const catConsorcio = await prisma.category.upsert({
    where: { slug: "consorcio" },
    update: { name: "Consórcio" },
    create: { name: "Consórcio", slug: "consorcio" }
  });

  const catServicos = await prisma.category.upsert({
    where: { slug: "servicos-e-manutencao" },
    update: { name: "Serviços e Manutenção" },
    create: { name: "Serviços e Manutenção", slug: "servicos-e-manutencao" }
  });

  // 2. Tags
  const tagProdutividade = await prisma.tag.upsert({ where: { slug: "produtividade" }, update: {}, create: { name: "Produtividade", slug: "produtividade" } });
  const tagEconomia = await prisma.tag.upsert({ where: { slug: "economia" }, update: {}, create: { name: "Economia", slug: "economia" } });
  const tagTecnologia = await prisma.tag.upsert({ where: { slug: "tecnologia" }, update: {}, create: { name: "Tecnologia", slug: "tecnologia" } });

  // 3. Posts Reais baseados em CBMaq.com.br
  const posts = [
    {
      title: "Consórcio CBMaq: A estratégia inteligente para renovar sua frota",
      slug: "consorcio-cbmaq-renovacao-frota",
      summary: "Descubra como o consórcio de máquinas pesadas permite um planejamento financeiro sólido, sem taxas de juros abusivas e com a garantia de entrega da CBMaq.",
      content: `
        <h2>Planejamento que gera crescimento</h2>
        <p>No setor de infraestrutura e agronegócio, ter uma frota moderna é sinônimo de competitividade. O <strong>Consórcio CBMaq</strong> surge como a solução ideal para empresas que buscam expandir sua operação de forma sustentável.</p>
        <h3>Vantagens competitivas:</h3>
        <ul>
          <li><strong>Sem juros:</strong> Apenas uma taxa de administração competitiva.</li>
          <li><strong>Poder de negociação:</strong> Compra à vista garante melhores condições.</li>
          <li><strong>Segurança:</strong> Grupos formados por parceiros sólidos e administradoras renomadas.</li>
        </ul>
        <p>A CBMaq oferece suporte completo na escolha da cota ideal para o seu perfil de investimento, garantindo que o seu próximo equipamento chegue no momento certo para o seu negócio.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
      published: true,
      categoryId: catConsorcio.id,
      tagIds: [tagEconomia.id, tagProdutividade.id]
    },
    {
      title: "Por que investir em Peças Genuínas para suas máquinas pesadas?",
      slug: "importancia-pecas-genuinas",
      summary: "O uso de componentes falsificados pode comprometer toda a engrenagem do seu negócio. Saiba por que a CBMaq prioriza apenas peças originais e certificadas.",
      content: `
        <h2>O risco oculto das peças paralelas</h2>
        <p>Muitas vezes, a economia imediata na compra de uma peça não original se transforma em um prejuízo gigantesco com a máquina parada no pátio. Peças genuínas são projetadas para suportar o regime severo de trabalho das máquinas CBMaq.</p>
        <p>Ao escolher peças originais em nosso balcão, você garante:</p>
        <ul>
          <li><strong>Durabilidade superior:</strong> Materiais testados em condições extremas.</li>
          <li><strong>Garantia de fábrica:</strong> Proteção total contra defeitos de fabricação.</li>
          <li><strong>Performance otimizada:</strong> Encaixe perfeito que reduz o consumo de combustível.</li>
        </ul>
        <p>Nosso estoque conta com milhares de itens à pronta entrega para garantir que sua operação nunca pare por falta de reposição de qualidade.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1504917595217-d4dc5f566f18?auto=format&fit=crop&q=80&w=1200",
      published: true,
      categoryId: catPecas.id,
      tagIds: [tagTecnologia.id, tagProdutividade.id]
    },
    {
      title: "Manutenção Especializada: A garantia de disponibilidade mecânica",
      slug: "manutencao-especializada-cbmaq",
      summary: "Nossos técnicos são treinados diretamente na fábrica para oferecer o melhor diagnóstico e reparo, assegurando que seu equipamento opere com máxima eficiência.",
      content: `
        <h2>Excelência em Serviços Automotivos e Industriais</h2>
        <p>A assistência técnica da CBMaq vai além do simples conserto. Nós trabalhamos com o conceito de <strong>Disponibilidade Mecânica</strong>, focando em manter sua máquina o máximo de tempo produzindo.</p>
        <h3>O que diferencia nosso serviço:</h3>
        <ul>
          <li><strong>Ferramental de ponta:</strong> Diagnósticos eletrônicos precisos.</li>
          <li><strong>Técnicos certificados:</strong> Conhecimento profundo de cada modelo.</li>
          <li><strong>Atendimento em campo:</strong> Unidades móveis preparadas para ir onde sua máquina está.</li>
        </ul>
        <p>Agende sua revisão periódica e evite surpresas desagradáveis. Na CBMaq, nós cuidamos da sua máquina para que ela cuide dos seus resultados.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
      published: true,
      categoryId: catServicos.id,
      tagIds: [tagProdutividade.id, tagTecnologia.id]
    }
  ];

  for (const post of posts) {
    const { tagIds, ...postData } = post;
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {
        title: postData.title,
        summary: postData.summary,
        content: postData.content,
        coverImage: postData.coverImage,
        categoryId: postData.categoryId,
        tags: {
          set: [],
          connect: tagIds.map(id => ({ id }))
        }
      },
      create: {
        ...postData,
        authorId: admin.id,
        publishedAt: new Date(),
        tags: {
          connect: tagIds.map(id => ({ id }))
        }
      }
    });
  }

  console.log("Seed de postagens REAIS concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
