import React from 'react';
import LandingPage from './landingpage/index';
import ProductClient from '../clients/ProductClient';

export async function getServerSideProps() {
  const resultMostResearched = await ProductClient.loadDataMostSearch();
  const resultFeedback = await ProductClient.loadFeedback();
  return { props: { mostResearched: resultMostResearched, feedback: resultFeedback } };
}

export default function Index({ mostResearched, feedback }) {
  return <LandingPage mostResearched={mostResearched} feedback={feedback} />;
}
