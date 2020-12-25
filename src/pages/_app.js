import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider as StyledTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider, CartContextProvider, ProtectRoute } from 'context';
import { Theme } from 'components';

import '../styles/globals.css';
import '../styles/icomoon.css';

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
        <link rel="preload" href="/fonts/icomoon.woff" as="font" crossOrigin="" />
      </Head>

      <AuthProvider>
        <ProtectRoute>
          <MuiThemeProvider theme={Theme}>
            <StyledTheme theme={Theme}>
              <CssBaseline />
              <CartContextProvider>
                <Component {...pageProps} />
              </CartContextProvider>
            </StyledTheme>
          </MuiThemeProvider>
        </ProtectRoute>
      </AuthProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
