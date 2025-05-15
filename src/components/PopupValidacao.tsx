import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PopupValidacaoProps = {
  isOpen: boolean;
  onClose: () => void;
  tipo: 'sucesso' | 'erro' | 'carregando';
  mensagem: string;
};

export default function PopupValidacao({ isOpen, onClose, tipo, mensagem }: PopupValidacaoProps) {
  const [progresso, setProgresso] = useState(100);

  useEffect(() => {
    if (isOpen && tipo === 'sucesso') {
      const timer = setInterval(() => {
        setProgresso((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 30);

      return () => {
        clearInterval(timer);
      };
    }
    
    if (isOpen) {
      setProgresso(100);
    }
  }, [isOpen, tipo, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay de fundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Pop-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="z-50 w-11/12 max-w-md"
          >
            <div className={`relative rounded-xl shadow-2xl overflow-hidden ${
              tipo === 'sucesso' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
              tipo === 'erro' ? 'bg-gradient-to-r from-red-500 to-red-700' :
              'bg-gradient-to-r from-amber-400 to-amber-600'
            }`}>
              {/* Barra de progresso (apenas para sucesso) */}
              {tipo === 'sucesso' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30 w-full">
                  <motion.div 
                    className="h-full bg-white"
                    initial={{ width: '100%' }}
                    animate={{ width: `${progresso}%` }}
                  />
                </div>
              )}

              <div className="p-6 text-white">
                {/* Ícone */}
                <div className="flex justify-center mb-4">
                  {tipo === 'sucesso' && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="bg-white bg-opacity-20 rounded-full p-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}

                  {tipo === 'erro' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ times: [0, 0.7, 1] }}
                      className="bg-white bg-opacity-20 rounded-full p-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.div>
                  )}

                  {tipo === 'carregando' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="bg-white bg-opacity-20 rounded-full p-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Mensagem */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-center mb-2"
                >
                  {tipo === 'sucesso' ? 'Sucesso!' : 
                   tipo === 'erro' ? 'Erro' : 
                   'Processando...'}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-white text-opacity-90"
                >
                  {mensagem}
                </motion.p>

                {/* Botão fechar (apenas para erro) */}
                {tipo === 'erro' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={onClose}
                    className="mt-4 w-full py-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all font-medium"
                  >
                    Fechar
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 