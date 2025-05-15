import React, { useMemo } from 'react';
import FormularioCadastro from '../componentes/FormularioCadastro';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function PaginaCadastro() {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }), []);

  return (
    <>
      <Head>
        <title>SolarMaster - Cadastro</title>
        <meta name="description" content="Crie sua conta no Sistema de Gerenciamento de Energia Solar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="h-screen overflow-hidden flex flex-col md:flex-row">
        {/* Lado esquerdo - Imagem de fundo e informações */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-amber-400 to-orange-600 p-10 text-white flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute w-full h-full top-0 left-0 opacity-20">
            <motion.svg 
              animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "loop" }}
              className="absolute transform -left-1/4 -top-1/4 w-3/4 h-3/4" 
              viewBox="0 0 184 184" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M182 2L2 182" stroke="white" strokeWidth="3" />
              <path d="M144 2L2 144" stroke="white" strokeWidth="3" />
              <path d="M106 2L2 106" stroke="white" strokeWidth="3" />
              <path d="M68 2L2 68" stroke="white" strokeWidth="3" />
              <path d="M30 2L2 30" stroke="white" strokeWidth="3" />
              <path d="M182 40L40 182" stroke="white" strokeWidth="3" />
              <path d="M182 78L78 182" stroke="white" strokeWidth="3" />
              <path d="M182 116L116 182" stroke="white" strokeWidth="3" />
              <path d="M182 154L154 182" stroke="white" strokeWidth="3" />
            </motion.svg>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl font-bold mb-6"
            >
              SolarMaster
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl mb-8 max-w-md"
            >
              Junte-se à nossa plataforma e comece a gerenciar seu sistema de energia solar hoje mesmo.
            </motion.p>
            
            <div className="flex space-x-4 mb-4">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm"
              >
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Controle total</div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm"
              >
                <div className="text-3xl font-bold">Fácil</div>
                <div className="text-sm">Gerenciamento</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 flex items-center space-x-2"
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ 
                y: [0, -5, 0],
                filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 10px rgba(255,255,255,0.5))", "drop-shadow(0 0 0px rgba(255,255,255,0))"]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </motion.svg>
            <div>
              <div className="font-medium text-base">Comece a economizar hoje</div>
              <div className="text-sm opacity-80">Monitoramento em tempo real da sua energia</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Lado direito - Formulário de cadastro */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 items-center justify-center p-6 bg-gray-50"
        >
          <FormularioCadastro />
        </motion.div>
      </div>
    </>
  );
} 