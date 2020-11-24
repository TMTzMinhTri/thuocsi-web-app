import React from 'react';

import Header from './Header/index';
import NavBar from './NavBar';
import Footer from '../Footer/index';

export default function LandingPage({ mostResearched }) {
  return (
    <div>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div style={{ height: '800px' }} />
      <Footer />
    </div>
  );
}
