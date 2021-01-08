import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import App from 'next/app';

// Theme
import { ThemeProvider as StyledTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider, CartContextProvider, ProtectRoute } from 'context';
import { Theme } from 'components';

// Toast
import { ToastContainer } from 'react-toastify';

/// I18N
import { i18n } from 'i18n-lib';

// CSS global
import '../styles/globals.css';
import '../styles/icomoon.css';
import 'react-toastify/dist/ReactToastify.css';

import { MOBILE } from 'constants/Device';

const NAMESPACE_REQUIRED_DEFAULT = 'common';

const MyApp = (props) => {
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
      </Head>

      <MuiThemeProvider theme={Theme}>
        <StyledTheme theme={Theme}>
          <CssBaseline />
          {/* Authen */}
          <AuthProvider>
            {/* Protect route */}
            <ProtectRoute>
              {/* Cart context provider */}
              <CartContextProvider>
                <Component {...pageProps} />
                <ToastContainer />
              </CartContextProvider>
            </ProtectRoute>
          </AuthProvider>
        </StyledTheme>
      </MuiThemeProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { defaultProps } = appContext.Component;
  const UA = appContext.ctx.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(`/${MOBILE}/i`));
  return {
    ...appProps,
    pageProps: {
      isMobile: !!isMobile,
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || [NAMESPACE_REQUIRED_DEFAULT]),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
  };
};

export default i18n.appWithTranslation(MyApp);
