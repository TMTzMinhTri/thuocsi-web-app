import React from 'react';

import Header from './Header/index';
import NavBar from './NavBar';
import Footer from '../Footer/index';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <NavBar />
      <div style={{ height: '800px' }} />
      <Footer />
    </div>
  );
}
