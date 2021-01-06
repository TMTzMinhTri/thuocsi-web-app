import React from 'react';
import ProductClient from 'clients/ProductClient';
// import { AuthClient } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(context) {
  const [mostResearched, infoBanner] = await Promise.all([
    ProductClient.loadDataMostSearch(context),
    ProductClient.getInfoBanner(),
  ]);
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ));

  return {
    props: {
      mostResearched,
      infoBanner,
      isMobile: !!isMobile,
    },
  };
}

const Index = (props) => <LandingPage {...props} />;

export default Index;
