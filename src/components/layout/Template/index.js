import React from 'react';
import Head from 'next/head';
import { Footer } from 'components/organisms';

export default function Layout({ title, children }) {
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
        <link rel="shortcut icon" href="images/logo_icon_thuocsi.svg" />
        <title>{title}</title>
      </Head>
      <div id="main">{children}</div>
      <Footer />
    </div>
  );
}
