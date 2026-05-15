import { getCategories, getTags } from "@/app/actions/blog";
import { PostForm } from "@/components/admin/blog/PostForm";

export const dynamic = "force-dynamic";

export default async function NovoPostPage() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags()
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <PostForm 
        categories={categories} 
        tags={tags} 
      />
    </div>
  );
}
