"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

type AlertType = "success" | "error" | "info" | "warning";
type ConfirmType = "destructive" | "primary" | "warning";

interface AlertOptions {
  title: string;
  message: ReactNode;
  type?: AlertType;
}

interface ConfirmOptions {
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmType;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface AlertContextData {
  showAlert: (options: AlertOptions) => void;
  showConfirm: (options: ConfirmOptions) => void;
}

const AlertContext = createContext<AlertContextData | undefined>(undefined);

export function useAppAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAppAlert must be used within AlertProvider");
  return ctx;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useState<(AlertOptions & { id: string }) | null>(null);
  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { id: string, loading: boolean }) | null>(null);

  const showAlert = useCallback((opts: AlertOptions) => {
    setAlertState({ ...opts, id: Math.random().toString() });
  }, []);

  const showConfirm = useCallback((opts: ConfirmOptions) => {
    setConfirmState({ ...opts, loading: false, id: Math.random().toString() });
  }, []);

  const closeAlert = () => setAlertState(null);
  
  const closeConfirm = () => {
    if (confirmState?.onCancel) confirmState.onCancel();
    setConfirmState(null);
  };

  const handleConfirm = async () => {
    if (!confirmState) return;
    setConfirmState(prev => prev ? { ...prev, loading: true } : null);
    try {
      await confirmState.onConfirm();
      setConfirmState(null);
    } catch (error) {
       // if error, let modal stay open and turn off loading or close it? 
       // For a standard modal, maybe stop loading, let user retry/cancel, or show alert.
       setConfirmState(prev => prev ? { ...prev, loading: false } : null);
       throw error;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      
      {typeof document !== "undefined" && createPortal(
        <>
          <AnimatePresence>
            {alertState && (() => {
              let Icon = Info;
              let iconClass = "text-blue-500 bg-blue-500/10";
              if (alertState.type === "success") { Icon = CheckCircle; iconClass = "text-green-500 bg-green-500/10"; }
              else if (alertState.type === "error") { Icon = AlertCircle; iconClass = "text-destructive bg-destructive/10"; }
              else if (alertState.type === "warning") { Icon = AlertCircle; iconClass = "text-amber-500 bg-amber-500/10"; }

              return (
                <div key={alertState.id} className="relative z-[9999]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={closeAlert}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
                  >
                    <div className="bg-background rounded-2xl shadow-2xl border border-border/50 w-full max-w-sm overflow-hidden pointer-events-auto">
                      <div className="flex items-center justify-between p-5 pb-0">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${iconClass}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h2 className="font-serif text-xl font-bold">{alertState.title}</h2>
                        </div>
                        <button
                          onClick={closeAlert}
                          className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="p-5">
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                          {alertState.message}
                        </p>
                      </div>
                      <div className="flex gap-3 p-5 pt-0">
                        <Button className="w-full" onClick={closeAlert}>
                          OK
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>

          <AnimatePresence>
            {confirmState && (() => {
              let confirmBtnVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" = "default";
              if (confirmState.type === "destructive") {
                confirmBtnVariant = "destructive";
              }

              return (
                <div key={confirmState.id} className="relative z-[9999]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => !confirmState.loading && closeConfirm()}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
                  >
                    <div className="bg-background rounded-2xl shadow-2xl border border-border/50 w-full max-w-sm overflow-hidden pointer-events-auto">
                      <div className="flex items-center justify-between p-5 pb-0">
                        <h2 className="font-serif text-xl font-bold">{confirmState.title}</h2>
                        <button
                          onClick={() => !confirmState.loading && closeConfirm()}
                          className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 flex-shrink-0 ml-4"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="p-5">
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                          {confirmState.message}
                        </p>
                      </div>
                      <div className="flex gap-3 p-5 pt-0">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={closeConfirm}
                          disabled={confirmState.loading}
                        >
                          {confirmState.cancelText || "Cancelar"}
                        </Button>
                        <Button
                          variant={confirmBtnVariant}
                          className="flex-1"
                          onClick={handleConfirm}
                          disabled={confirmState.loading}
                        >
                          {confirmState.loading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Aguarde...
                            </span>
                          ) : (
                            confirmState.confirmText || "Confirmar"
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>
        </>,
        document.body
      )}
    </AlertContext.Provider>
  );
}
