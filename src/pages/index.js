import React from 'react';
import ProductClient from 'clients/ProductClient';
import LandingPage from './landingpage/index';

export async function getServerSideProps() {
  const [mostResearched, feedback, infoBanner] = await Promise.all([
    ProductClient.loadDataMostSearch(),
    ProductClient.loadFeedback(),
    ProductClient.getInfoBanner(),
  ]);

  return {
    props: {
      mostResearched,
      feedback,
      infoBanner,
    },
  };
}

export default function Index({ mostResearched, feedback, infoBanner }) {
  return (
    <LandingPage mostResearched={mostResearched} feedback={feedback} infoBanner={infoBanner} />
  );
}
