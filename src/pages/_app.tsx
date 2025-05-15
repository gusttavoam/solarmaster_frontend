import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SolarMaster - Sistema de Gerenciamento de Energia Solar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SolarMaster - Sistema de Gerenciamento de Energia Solar" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen antialiased">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp; 