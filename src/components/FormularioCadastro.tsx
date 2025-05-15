import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FormularioCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const aoEnviar = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setCarregando(false);
      return;
    }

    // Simulando uma requisição de API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulação de sucesso
    alert('Cadastro realizado com sucesso!');
    
    setCarregando(false);
  }, [nome, email, senha, confirmarSenha]);

  const alternarTema = useCallback(() => {
    setTemaEscuro(prevTema => !prevTema);
  }, []);

  const alternarVisibilidadeSenha = useCallback(() => {
    setMostrarSenha(prevState => !prevState);
  }, []);

  const alternarVisibilidadeConfirmarSenha = useCallback(() => {
    setMostrarConfirmarSenha(prevState => !prevState);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md rounded-xl shadow-xl overflow-hidden ${temaEscuro ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className={`${temaEscuro ? 'bg-gradient-to-r from-amber-600 via-orange-700 to-amber-800' : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600'} p-6 relative overflow-hidden`}>
        <motion.div
          className="absolute top-3 right-3 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={alternarTema}
            className="p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            aria-label="Alternar tema"
            type="button"
          >
            {temaEscuro ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </motion.div>
      
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

      <form onSubmit={aoEnviar} className={`p-6 ${temaEscuro ? 'bg-gray-800 text-white' : ''}`}>
        <motion.h2 
          className={`text-xl font-semibold mb-4 text-center ${temaEscuro ? 'text-white' : 'text-gray-700'}`}
        >
          Crie sua conta
        </motion.h2>
        
        <motion.div className="mb-4">
          <label className={`block text-sm font-semibold mb-2 ${temaEscuro ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              temaEscuro 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300'
            }`}
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </motion.div>
        
        <motion.div className="mb-4">
          <label className={`block text-sm font-semibold mb-2 ${temaEscuro ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              temaEscuro 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300'
            }`}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>

        <motion.div className="mb-4 relative">
          <label className={`block text-sm font-semibold mb-2 ${temaEscuro ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="senha">
            Senha
          </label>
          <div className="relative flex items-center">
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                temaEscuro 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300'
              }`}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
            />
            <div className="absolute right-3 h-5 flex items-center justify-center">
              <motion.button
                type="button"
                className={`focus:outline-none ${temaEscuro ? 'text-gray-300' : 'text-gray-500'}`}
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
          <p className={`text-xs mt-1 ${temaEscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Mínimo de 6 caracteres
          </p>
        </motion.div>

        <motion.div className="mb-6 relative">
          <label className={`block text-sm font-semibold mb-2 ${temaEscuro ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="confirmarSenha">
            Confirmar senha
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmarSenha"
              type={mostrarConfirmarSenha ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                temaEscuro 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300'
              }`}
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            <div className="absolute right-3 h-5 flex items-center justify-center">
              <motion.button
                type="button"
                className={`focus:outline-none ${temaEscuro ? 'text-gray-300' : 'text-gray-500'}`}
                onClick={alternarVisibilidadeConfirmarSenha}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarConfirmarSenha ? (
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
          {carregando ? 'Cadastrando...' : 'Criar conta'}
        </motion.button>

        <motion.div className="flex items-center justify-center mt-4">
          <Link href="/login" passHref legacyBehavior>
            <motion.a 
              className={`text-sm ${temaEscuro ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-800'} transition-all cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
              Já possui uma conta? Faça login
            </motion.a>
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
} 