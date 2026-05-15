"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    summary?: string | null;
    coverImage?: string | null;
    createdAt: Date;
    author: { name: string | null };
    category?: { name: string } | null;
  };
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex flex-col h-full bg-background border border-border/50 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
        <img
          src={post.coverImage || "/images/hero/slide-bg-default.webp"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {post.category && (
          <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md text-foreground hover:bg-background rounded-full border-none px-4 py-1.5 shadow-sm">
            {post.category.name}
          </Badge>
        )}
      </Link>

      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-primary" />
            {format(new Date(post.createdAt), "dd 'de' MMMM", { locale: ptBR })}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-3 w-3 text-primary" />
            {post.author.name}
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="block group/title">
          <h3 className="text-xl font-serif font-bold leading-tight group-hover/title:text-primary transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {post.summary || "Leia mais sobre este assunto importante para o setor de máquinas pesadas e gestão de frotas..."}
        </p>

        <div className="mt-auto pt-6 border-t border-border/50">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-all group/link"
          >
            Ler artigo completo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
