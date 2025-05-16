'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    // Verificar se estamos no cliente (browser)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('solarmaster_user');
      const token = Cookies.get('solarmaster_auth');
      
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    }
  }, []);

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Implementar chamada ao backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }
      
      const data = await response.json();
      
      // Guarda token em cookie (7 dias ou conforme retornado pela API)
      Cookies.set('solarmaster_auth', data.token, { expires: 7 });
      
      // Guarda usuário no localStorage
      localStorage.setItem('solarmaster_user', JSON.stringify(data.user));
      setUser(data.user);
      
      // Redireciona para o dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      // Opcional: notificar o backend sobre o logout
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('solarmaster_auth')}`,
        },
      }).catch(error => console.error('Erro ao notificar logout:', error));
      
      // Remove cookie
      Cookies.remove('solarmaster_auth');
      
      // Remove do localStorage
      localStorage.removeItem('solarmaster_user');
      
      // Limpa estado
      setUser(null);
      
      // Redireciona para login
      router.push('/login');
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
} 