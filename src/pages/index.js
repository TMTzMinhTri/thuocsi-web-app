import React from 'react';
import { ProductClient, doWithServerSide } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [mostResearched, infoBanner] = await Promise.all([
      ProductClient.loadDataMostSearch(ctx),
      ProductClient.getInfoBanner(),
    ]);

    return {
      props: {
        mostResearched,
        infoBanner,
      },
    };
  });
}

const Index = (props) => <LandingPage {...props} />;

export default Index;
