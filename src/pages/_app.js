import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import App from 'next/app';
import { useRouter } from 'next/router';
import getConfig from'next/config'

// Theme
import { ThemeProvider as StyledTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  AuthProvider,
  CartContextProvider,
  LoadingRoute,
  NotiContextProvider,
  SettingProvider,
} from 'context';
import Theme from 'components/layout/Theme';

// Toast
import { ToastContainer } from 'react-toastify';

// CSS global
import '../styles/globals.css';
import '../styles/icomoon.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MOBILE } from 'constants/Device';
import { fbpixel, gtag, ScrollToTop } from 'utils';
import MessengerChat from 'utils/MessengerChat';

const{ publicRuntimeConfig }= getConfig();
const MyApp = (props) => {
  const { Component, pageProps } = props;
  const refContainer = useRef('fb-msgr');

  const router = useRouter();

  const { refer, action, login, forgetpasscode, t } = router?.query || {};
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

  // TODO:
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
            refer={refer}
            forgetpasscode={forgetpasscode}
            action={action}
            tokenv1={t}
          >
            {/* Protect route */}
            <LoadingRoute>
              {/* Cart context provider */}
              <CartContextProvider>
                <NotiContextProvider>
                  {/* settings config all */}
                  <SettingProvider>
                    <Component {...pageProps} />
                    <MessengerChat ref={refContainer} />
                    <ScrollToTop {...router} />
                  </SettingProvider>
                </NotiContextProvider>
                <ToastContainer
                  limit={6}
                  pauseOnHover={false}
                  hideProgressBar
                  autoClose={3000}
                  closeOnClick
                />
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
  let isMobile = '';
  try {
    const UA = appContext.ctx.req.headers['user-agent'];
    isMobile = Boolean(UA.match(MOBILE));
  } catch (error) {
    isMobile = `can not detect device - ${error}`;
  }

  return {
    ...appProps,
    pageProps: {
      isMobile: !!isMobile,
      buildId: publicRuntimeConfig.buildId,
    },
  };
};

export default MyApp;
