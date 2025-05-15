import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupValidacao from './PopupValidacao';

export default function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // Estado para controlar o pop-up
  const [popupAberto, setPopupAberto] = useState(false);
  const [popupTipo, setPopupTipo] = useState<'sucesso' | 'erro' | 'carregando'>('carregando');
  const [popupMensagem, setPopupMensagem] = useState('');

  const aoEnviar = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    // Validações simples
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      setCarregando(false);
      return;
    }

    // Mostrar popup de carregando
    setPopupTipo('carregando');
    setPopupMensagem('Verificando suas credenciais...');
    setPopupAberto(true);

    // Simulando uma requisição de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Credenciais de teste
    if (email === 'teste@email.com' && senha === '123456') {
      // Login bem-sucedido
      setPopupTipo('sucesso');
      setPopupMensagem('Login realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        // Aqui você redirecionaria para a página interna
        // window.location.href = '/dashboard';
      }, 3000);
    } else {
      // Login falhou
      setErro('Email ou senha incorretos.');
      setPopupTipo('erro');
      setPopupMensagem('Credenciais inválidas. Verifique seu email e senha.');
    }
    
    setCarregando(false);
  }, [email, senha]);

  const fecharPopup = useCallback(() => {
    setPopupAberto(false);
  }, []);

  const alternarVisibilidadeSenha = useCallback(() => {
    setMostrarSenha(prevState => !prevState);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSenhaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-xl shadow-xl overflow-hidden bg-white"
      >
        {/* Card de monitoramento apenas para telas pequenas com cores ajustadas */}
        <motion.div 
          className="md:hidden w-full bg-amber-600 text-white p-5 border-b border-amber-400/30" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-center mb-2">Monitoramento Inteligente</h2>
          <p className="text-xs text-center mb-3 px-4">
            Gerencie suas usinas solares com eficiência, monitore a geração em tempo real.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-amber-500/30 rounded-lg p-2 text-center text-xs border border-amber-300/20 shadow-sm">
              <span className="font-semibold block mb-1">Monitoramento</span>
              em tempo real
            </div>
            <div className="bg-amber-500/30 rounded-lg p-2 text-center text-xs border border-amber-300/20 shadow-sm">
              <span className="font-semibold block mb-1">Inteligência</span>
              comercial
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-amber-500/30 rounded-lg p-2 text-center text-xs border border-amber-300/20 shadow-sm">
              <span className="font-semibold block mb-1">Alertas</span>
              inteligentes
            </div>
            <div className="bg-amber-500/30 rounded-lg p-2 text-center text-xs border border-amber-300/20 shadow-sm">
              <span className="font-semibold block mb-1">Relatórios</span>
              detalhados
            </div>
          </div>
        </motion.div>
          
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 p-6 relative overflow-hidden">
          <div className="flex justify-center relative z-10">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ 
                scale: [1, 1.05, 1],
                filter: ["drop-shadow(0 0 8px rgba(255,255,255,0.5))", "drop-shadow(0 0 12px rgba(255,255,255,0.8))", "drop-shadow(0 0 8px rgba(255,255,255,0.5))"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </motion.svg>
          </div>
          
          <motion.h1 
            className="text-2xl font-bold text-white text-center mt-2"
          >
            SolarMaster
          </motion.h1>
          
          <motion.p 
            className="text-sm text-white text-center opacity-80"
          >
            Sistema de Gerenciamento de Energia Solar
          </motion.p>
        </div>

        <form onSubmit={aoEnviar} className="p-6">
          <motion.h2 
            className="text-xl font-semibold mb-4 text-center text-gray-700"
          >
            Acesse sua conta
          </motion.h2>
          
          <motion.div 
            className="mb-4"
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all border-gray-300"
              placeholder="seu@email.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </motion.div>

          <motion.div 
            className="mb-6 relative"
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="senha">
              Senha
            </label>
            <div className="relative flex items-center">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all border-gray-300"
                placeholder="••••••••"
                value={senha}
                onChange={handleSenhaChange}
                required
              />
              <div className="absolute right-3 h-5 flex items-center justify-center">
                <motion.button
                  type="button"
                  className="focus:outline-none text-gray-500"
                  onClick={alternarVisibilidadeSenha}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {erro && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm mb-4"
              >
                {erro}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-md flex justify-center items-center text-base"
            disabled={carregando}
          >
            {carregando ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {carregando ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>
      </motion.div>

      {/* Pop-up de validação */}
      <PopupValidacao 
        isOpen={popupAberto}
        onClose={fecharPopup}
        tipo={popupTipo}
        mensagem={popupMensagem}
      />
    </>
  );
} 