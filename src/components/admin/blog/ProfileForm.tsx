"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/app/actions/profile";
import { Save, User, Mail, Lock } from "lucide-react";

interface ProfileFormProps {
  initialUser: {
    name?: string;
    email?: string;
  };
}

export function ProfileForm({ initialUser }: ProfileFormProps) {
  const [name, setName] = useState(initialUser.name || "");
  const [email, setEmail] = useState(initialUser.email || "");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    const result = await updateProfile({
      name,
      email,
      password: password || undefined
    });

    if (result.success) {
      alert("Perfil atualizado com sucesso!");
      setPassword("");
    } else {
      alert(result.error);
    }
    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-background border border-border p-8 rounded-3xl shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <User className="h-3 w-3" /> Nome
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Mail className="h-3 w-3" /> E-mail
          </Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Lock className="h-3 w-3" /> Nova Senha (opcional)
          </Label>
          <Input
            id="pass"
            type="password"
            placeholder="Deixe em branco para manter a atual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl h-11"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="w-full h-11 rounded-xl gap-2">
        <Save className="h-4 w-4" />
        {isSaving ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}
