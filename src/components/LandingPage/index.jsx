import React from 'react';

import Header from './Header/index';
import NavBar from './NavBar';
import Footer from '../Footer/index';
import Media from '../Media';
import Slider from '../Slider';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <NavBar />
      <div style={{ height: '800px' }} />
      <Slider />
      <Media />
      <Footer />
    </div>
  );
}
