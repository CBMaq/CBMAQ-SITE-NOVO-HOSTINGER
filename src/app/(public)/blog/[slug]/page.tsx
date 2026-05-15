import { getPostBySlug } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, User, ChevronLeft, Tag as TagIcon, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Estimar tempo de leitura simples
  const wordsPerMinute = 200;
  const noOfWords = post.content.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);

  return (
    <article className="min-h-screen pt-24 pb-20">
      {/* Article Header */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={post.coverImage || "/images/hero/slide-bg-default.webp"}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container px-4 mx-auto pb-12">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="ghost" className="rounded-full bg-background/20 backdrop-blur-md text-foreground hover:bg-background/40 -ml-2 mb-4">
                   <Link href="/blog">
                     <ChevronLeft className="h-4 w-4 mr-2" />
                     Voltar ao Blog
                   </Link>
                </Button>
              </div>

              {post.category && (
                <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                  {post.category.name}
                </Badge>
              )}

              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {post.author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {minutes} min de leitura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container px-4 mx-auto pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Resumo/Lead */}
          {post.summary && (
            <div className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed mb-12 border-l-4 border-primary pl-8 py-2 font-medium italic">
              {post.summary}
            </div>
          )}

          {/* Body Content from Tiptap */}
          <div 
            className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-cbmaq-navy 
              prose-p:text-muted-foreground prose-p:leading-loose
              prose-img:rounded-[2rem] prose-img:shadow-xl
              prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:font-serif prose-blockquote:text-2xl
              prose-a:text-primary prose-a:font-bold hover:prose-a:text-primary/80
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Footer */}
          {post.tags.length > 0 && (
            <div className="mt-20 pt-10 border-t border-border/50 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mr-2 flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                Tags:
              </span>
              {post.tags.map((tag: any) => (
                <Badge key={tag.id} variant="outline" className="rounded-full px-4 py-1 text-muted-foreground border-border hover:bg-muted transition-colors">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA / Newsletter / Contact */}
          <div className="mt-20 p-12 bg-primary text-primary-foreground rounded-[3rem] text-center shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/hero/slide-bg-default.webp')] bg-cover bg-center opacity-10 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-white">Gostou deste conteúdo?</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto">
                Fale com um de nossos especialistas e descubra como a CBMaq pode otimizar a sua operação com tecnologia e tradição.
              </p>
              <Button asChild size="lg" variant="ghost" className="bg-white text-primary hover:bg-white/90 hover:text-primary rounded-full px-8 font-bold uppercase tracking-widest transition-all duration-300 shadow-lg">
                <Link href="/contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
