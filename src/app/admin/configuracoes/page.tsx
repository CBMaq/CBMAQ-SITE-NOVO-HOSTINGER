import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Settings } from "lucide-react";
import { ProfileForm } from "@/components/admin/blog/ProfileForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie seus dados de perfil e segurança.</p>
        </div>
      </div>

      <div className="max-w-xl">
        <ProfileForm initialUser={session?.user as any} />
      </div>
    </div>
  );
}
