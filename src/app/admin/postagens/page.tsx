import { getPosts } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Search, Edit3, Trash2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DeletePostButton } from "@/components/admin/blog/DeletePostButton";

export const dynamic = "force-dynamic";

export default async function PostagensPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="p-3 bg-primary/10 rounded-2xl">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold">Postagens</h1>
            <p className="text-muted-foreground">Gerencie o conteúdo do seu blog.</p>
          </div>
        </div>

        <Button asChild className="h-11 rounded-xl px-6 gap-2 shadow-lg hover:shadow-primary/20 transition-all">
          <Link href="/admin/postagens/novo">
            <Plus className="h-5 w-5" />
            Nova Postagem
          </Link>
        </Button>
      </div>

      <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar títulos..."
              className="pl-10 h-10 rounded-xl"
            />
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-muted/30 text-xs uppercase tracking-wider font-bold">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="py-4">Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhuma postagem encontrada. Comece criando uma agora!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post: any) => (
                <TableRow key={post.id} className="group hover:bg-muted/30 transition-colors border-border/50">
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        /{post.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.category?.name ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-bold rounded-lg border-none">
                        {post.category.name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground italic text-xs">Sem categoria</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {post.author.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(post.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 rounded-lg">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30 rounded-lg">
                        Rascunho
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary transition-colors" asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary transition-colors" asChild>
                        <Link href={`/admin/postagens/editar/${post.id}`}>
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
