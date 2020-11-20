import React from 'react';
import Head from 'next/head';
import Copyright from './Copyright';

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>

      <div id="main">{children}</div>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
}
