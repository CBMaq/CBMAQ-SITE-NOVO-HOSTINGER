"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { signOut } from "next-auth/react";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function LogoutButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={() => !isLoading && setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border/50 w-full max-w-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-0">
                <h2 className="font-serif text-xl font-bold">Sair da Conta</h2>
                <button
                  onClick={() => !isLoading && setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar o clube de benefícios.
                </p>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-5 pt-0">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saindo...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sim, sair
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {className ? (
        <button
          onClick={() => setIsOpen(true)}
          className={className}
        >
          <LogOut className="h-5 w-5" />
          Sair da Conta
        </button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          title="Sair da Conta"
          onClick={() => setIsOpen(true)}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )}

      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
