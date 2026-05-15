import { db } from "@/lib/db";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="pt-24 min-h-screen">
      {/* Blog Hero Header */}
      <section className="bg-muted py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/slide-bg-default.webp')] bg-cover bg-center mix-blend-overlay opacity-10" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              Blog CBMaq: <span className="text-primary">Conhecimento que Move.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fique por dentro das últimas tendências do mercado de máquinas pesadas, dicas de manutenção e novidades da nossa operação.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[80px] z-30 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container px-4 mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
              <button className="text-xs font-bold uppercase tracking-widest text-primary pb-1 border-b-2 border-primary whitespace-nowrap">
                Todos os Posts
              </button>
              <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground pb-1 whitespace-nowrap transition-colors">
                Dicas de Manutenção
              </button>
              <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground pb-1 whitespace-nowrap transition-colors">
                Peças e Equipamentos
              </button>
              <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground pb-1 whitespace-nowrap transition-colors">
                Novidades CBMaq
              </button>
            </div>

            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar artigos..."
                className="pl-10 h-11 rounded-full bg-muted/30 border-none focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-32 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
               <p className="text-muted-foreground text-lg">Em breve, novos conteúdos exclusivos para você.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post: any, i: number) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
