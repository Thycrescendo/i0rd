import type { AppProps } from 'next/app';
import { CoinProvider } from '../contexts/CoinContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinProvider>
      <Component {...pageProps} />
    </CoinProvider>
  );
}

export default MyApp;