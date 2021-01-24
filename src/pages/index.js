import React from 'react';
import { ProductClient, doWithServerSide } from 'clients';
import dynamic from 'next/dynamic';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const isTotal = false;
    const [mostResearched, infoBanner, products] = await Promise.all([
      ProductClient.loadDataMostSearch(ctx),
      ProductClient.getInfoBanner(),
      ProductClient.loadDataProductCollection(ctx, isTotal),
    ]);
    return {
      props: {
        mostResearched,
        infoBanner,
        products,
      },
    };
  });
}

const Index = (props) => {
  const LandingPageDynamic = dynamic(() => import('./landingpage'));
  return <LandingPageDynamic {...props} />;
};

export default Index;
