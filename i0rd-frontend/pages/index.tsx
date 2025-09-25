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
        <title>NFT.Ring - Home</title>
        <meta name="description" content="NFT.Ring - A platform for buying, selling, and exploring NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full"> {/* Changed from max-w-screen-lg mx-auto */}
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