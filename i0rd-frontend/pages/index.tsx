import React from 'react';
import Head from 'next/head';
import MainPage from '@containers/MainPage';
import GenerationOnlineShopping from '@containers/GenerationOnlineShopping';
import Blog from '@containers/Blog';
import Category from '@containers/Category';
import CryptoCoins from '@containers/CryptoCoins';
import Mailing from '@containers/Mailing';
import Footer from '@containers/Footer';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>I0rd - Decentralized AI-Powered Crypto Trading on 0G Blockchain</title>
        <meta
          name="description"
          content="I0rd is a decentralized, AI-powered crypto trading app built on 0G’s Modular Layer 1 blockchain. Trade crypto with real-time analysis, AI insights, and community tools for transparent, accessible trading."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <MainPage />
        <GenerationOnlineShopping />
        <Blog />
        <Category />
        <CryptoCoins />
        <Mailing />
        <Footer />
      </div>
    </>
  );
}