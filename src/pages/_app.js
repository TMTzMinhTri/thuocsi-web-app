import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import App from 'next/app';
import { useRouter } from 'next/router';

// Theme
import { ThemeProvider as StyledTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider, CartContextProvider, LoadingRoute, NotiContextProvider } from 'context';
import Theme from 'components/layout/Theme';

// Toast
import { ToastContainer } from 'react-toastify';

/// I18N
import { i18n } from 'i18n-lib';

// CSS global
import '../styles/globals.css';
import '../styles/icomoon.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MOBILE } from 'constants/Device';

import { fbpixel, gtag } from 'utils';
import MessengerChat from 'utils/MessengerChat';

const NAMESPACE_REQUIRED_DEFAULT = 'common';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const refContainer = useRef('fb-msgr');

  const router = useRouter();

  const { referralCode, action, login, forgetpasscode } = router?.query || {};
  const isShowingLogin = login === 'true';

  // config https://material-ui.com/guides/server-rendering/
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      fbpixel.pageview();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Tra cứu và đặt thuốc giá sỉ nhanh tại thuocsi.vn</title>
        <link rel="shortcut icon" href="images/favicon-16x16.png" size="16x16" />
        <link rel="shortcut icon" href="images/favicon-32x32.png" size="32x32" />
        <link rel="shortcut icon" href="images/favicon-96x96.png" size="96x96" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <StyledTheme theme={Theme}>
        <MuiThemeProvider theme={Theme}>
          <CssBaseline />
          {/* Authen */}
          <AuthProvider
            isShowingLogin={isShowingLogin}
            referralCode={referralCode}
            forgetpasscode={forgetpasscode}
            action={action}
          >
            {/* Protect route */}
            <LoadingRoute>
              {/* Cart context provider */}
              <CartContextProvider>
                <NotiContextProvider>
                  <Component {...pageProps} />
                  <MessengerChat pageId="548944538816598" ref={refContainer} />
                </NotiContextProvider>
                <ToastContainer limit={6} />
              </CartContextProvider>
            </LoadingRoute>
          </AuthProvider>
        </MuiThemeProvider>
      </StyledTheme>
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
  let isMobile = '';
  try {
    const UA = appContext.ctx.req.headers['user-agent'];
    isMobile = Boolean(UA.match(MOBILE));
  } catch (error) {
    isMobile = `can not detect device - ${error}`;
  }

  // check is client
  // init web socket

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
