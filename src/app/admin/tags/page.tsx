import { getTags } from "@/app/actions/blog";
import { TagManager } from "@/components/admin/blog/TagManager";
import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Tag className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Tags</h1>
          <p className="text-muted-foreground">Etiquetas para filtragem flexível de conteúdos.</p>
        </div>
      </div>

      <TagManager initialTags={tags} />
    </div>
  );
}
