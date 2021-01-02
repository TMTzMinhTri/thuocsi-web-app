import React from 'react';
import ProductClient from 'clients/ProductClient';
// import { AuthClient } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(context) {
  const [mostResearched, infoBanner] = await Promise.all([
    ProductClient.loadDataMostSearch(context),
    ProductClient.getInfoBanner(),
  ]);

  return {
    props: {
      mostResearched,
      infoBanner,
    },
  };
}

const Index = (props) => <LandingPage {...props} />;

export default Index;
