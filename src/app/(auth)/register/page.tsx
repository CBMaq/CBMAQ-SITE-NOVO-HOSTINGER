"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { maskCPF, maskPhone, unmask } from "@/lib/masks";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(maskPhone(e.target.value));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(maskCPF(e.target.value));
  };

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Unmask data before sending
    data.phone = unmask(phone);
    data.document = unmask(document);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        const errJson = await resp.json();
        throw new Error(errJson.error?.message || "Ocorreu um erro no cadastro.");
      }

      // Success, redirect to login
      router.push("/login?registered=1");
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Crie sua Conta</h1>
          <p className="text-sm text-muted-foreground">Faça o seu cadastro inicial para assinar nosso clube.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" name="name" type="text" placeholder="Maria da Silva" required disabled={loading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="nome@exemplo.com" required disabled={loading} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Criar Senha</Label>
            <div className="relative">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                disabled={loading} 
                minLength={8} 
                placeholder="Mínimo de 8 caracteres" 
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Celular (WhatsApp)</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              disabled={loading} 
              placeholder="(00) 00000-0000" 
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">CPF</Label>
            <Input 
              id="document" 
              name="document" 
              type="text" 
              disabled={loading} 
              placeholder="000.000.000-00" 
              value={document}
              onChange={handleDocumentChange}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <Button className="w-full mt-6" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground pt-4 border-t border-border mt-8">
          Já possui conta? <Link href="/login" className="text-primary hover:underline font-medium">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
