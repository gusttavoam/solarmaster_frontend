'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, senha);
      // Não precisamos redirecionar aqui, o contexto já faz isso
    } catch (err) {
      setError('Email ou senha inválidos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo - informações */}
      <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-yellow-400 to-orange-500 p-10 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 transition-transform duration-700 ease-in-out transform hover:translate-x-2">SolarMaster</h1>
          
          <div className="mt-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Monitoramento Inteligente de Energia Solar
            </h2>
            <p className="text-white text-lg mb-6">
              Gerencie suas usinas solares com eficiência, monitore a geração em tempo real e automatize seus processos comerciais.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-sm transition duration-300 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Monitoramento em tempo real</h3>
              <p className="text-white text-sm">Acompanhe a geração de energia de todas as suas usinas</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-sm transition duration-300 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Inteligência comercial</h3>
              <p className="text-white text-sm">Automatize vendas e orçamentos com facilidade</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-sm transition duration-300 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Alertas inteligentes</h3>
              <p className="text-white text-sm">Seja notificado sobre falhas e manutenções</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-sm transition duration-300 hover:bg-opacity-30 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Relatórios detalhados</h3>
              <p className="text-white text-sm">Visualize dados e exporte relatórios facilmente</p>
            </div>
          </div>
        </div>

        <div className="flex items-center text-white mt-8 relative z-10 transition duration-300 hover:translate-x-2">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-in-out hover:rotate-12">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          </div>
          <div>
            <p className="font-semibold">Energia limpa e renovável</p>
            <p className="text-sm">Ajudando a construir um futuro sustentável</p>
          </div>
        </div>
      </div>

      {/* Lado direito - formulário de login */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 transition-all duration-300 ease-in-out hover:shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 transition-transform duration-500 ease-in-out transform hover:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">SolarMaster</h2>
            <p className="text-gray-600 mt-1">Acesse sua conta para começar</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm animate-pulse">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="********"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 hover:scale-110">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 hover:scale-110">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="lembrar"
                  name="lembrar"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label htmlFor="lembrar" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </div>
                ) : (
                  "Entrar na plataforma"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 