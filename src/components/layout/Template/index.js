import React from 'react';
import Head from 'next/head';
import { Footer, FooterMobile } from 'components/organisms';

export default function Layout({ title, children, isMobile }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <meta name="keywords" content="thuốc sỉ" />
        <meta
          name="description"
          content="Chợ thuốc sỉ online lớn nhất Việt Nam với hơn 7500 loại thuốc, giá minh bạch, giao hàng miễn phí toàn quốc"
        />
        <link rel="shortcut icon" href="images/favicon-16x16.png" size="16x16" />
        <link rel="shortcut icon" href="images/favicon-32x32.png" size="32x32" />
        <link rel="shortcut icon" href="images/favicon-96x96.png" size="96x96" />
        <title>{title}</title>
      </Head>
      <div id="main">{children}</div>
      {isMobile ? <FooterMobile /> : <Footer />}
    </div>
  );
}
