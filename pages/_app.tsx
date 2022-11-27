import '../styles/globals.css'
import { useEffect } from "react";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (pageProps.isHome) {
      document.body.className = "home";
    }
  });
  return <Component {...pageProps} />
}

export default MyApp
