import React from 'react';

import Header from './Header/index';
import NavBar from './NavBar';
import Footer from '../Footer/index';
import Media from '../Media';
import SliderComp from '../Slider';
import CommonQuestion from '../CommonQuestion';

export default function LandingPage({ mostResearched, feedback }) {
  return (
    <div>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div style={{ height: '800px' }} />
      <CommonQuestion />
      <SliderComp feedback={feedback} />
      <Media />
      <Footer />
    </div>
  );
}
