"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Mensagem Enviada!", 
  message = "Recebemos sua solicitação com sucesso. Nossa equipe entrará em contato em breve." 
}: SuccessModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[500px] bg-white rounded-[32px] p-8 md:p-12 shadow-2xl text-center z-10 overflow-hidden"
          >
            {/* Close Button ("X" vermelho) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 
                }}
                className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[#0A2A5E] mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-[1rem] md:text-[1.125rem] text-[#4B5563] leading-relaxed mb-8">
              {message}
            </p>

            <button
              onClick={onClose}
              className="w-full h-[3.5rem] bg-[#0A2A5E] text-white rounded-full font-bold text-[1rem] hover:bg-[#0A4EE4] transition-colors shadow-lg"
            >
              Entendido
            </button>

            {/* Decorative element */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-50 rounded-full opacity-50 blur-3xl -z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
