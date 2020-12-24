import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider as StyledTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider, CartContextProvider } from 'context';
import { Theme } from 'components';
import whyDidYouRender from '@welldone-software/why-did-you-render';

import '../styles/globals.css';
import '../styles/icomoon.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
export default function MyApp(props) {
  const { Component, pageProps } = props;

  // config https://material-ui.com/guides/server-rendering/
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>ThuocSi</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          rel="stylesheet preload prefetch"
          href="/fonts/icomoon.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/icomoon.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/icomoon.svg"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/icomoon.eot"
          as="font"
          crossOrigin=""
        />
      </Head>

      <MuiThemeProvider theme={Theme}>
        <StyledTheme theme={Theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <CartContextProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </CartContextProvider>
        </StyledTheme>
      </MuiThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
