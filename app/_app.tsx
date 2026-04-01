// frontend/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { applyTheme } from '../lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Apply institute-specific theme
    // console.log('Applying theme based on institute configuration in _app.tsx');
    if (pageProps.instituteConfig) {
      applyTheme(pageProps.instituteConfig.theme);
    }
  }, [pageProps.instituteConfig]);
  
  return <Component {...pageProps} />;
}