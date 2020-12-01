import React from 'react';
import type { AppProps } from 'next/app';
import { globalCSS } from '@assets/GlobalStyles';
import { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
  ${globalCSS}
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalCSS />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
