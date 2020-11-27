import React from 'react';
import LandingPage from './landingpage/index';
import ProductClient from '../clients/ProductClient';

export async function getServerSideProps() {
  const resultMostResearched = await ProductClient.loadDataMostSearch();
  const resultFeedback = await ProductClient.loadFeedback();
  const resultInfoBanner = await ProductClient.getInfoBanner();
  return {
    props: {
      mostResearched: resultMostResearched,
      feedback: resultFeedback,
      infoBanner: resultInfoBanner,
    },
  };
}

export default function Index({ mostResearched, feedback, infoBanner }) {
  return (
    <LandingPage mostResearched={mostResearched} feedback={feedback} infoBanner={infoBanner} />
  );
}
