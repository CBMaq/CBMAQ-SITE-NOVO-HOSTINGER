import { getCategories, getTags, getPostById } from "@/app/actions/blog";
import { PostForm } from "@/components/admin/blog/PostForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditarPostPage({ params }: PageProps) {
  const { id } = await params;
  
  const [post, categories, tags] = await Promise.all([
    getPostById(id),
    getCategories(),
    getTags()
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PostForm 
        initialData={post}
        categories={categories} 
        tags={tags} 
      />
    </div>
  );
}
