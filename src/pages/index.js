import React from 'react';
import { ProductClient, doWithServerSide, isValid } from 'clients';
import dynamic from 'next/dynamic';
// import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const isTotal = false;
    const [mostResearched, infoBanner, products] = await Promise.all([
      ProductClient.loadDataMostSearch(ctx),
      ProductClient.getInfoBanner(),
      ProductClient.loadDataProductCollection(ctx, isTotal),
    ]);
    if (!isValid(products)) {
      return {
        redirect: {
          // destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    return {
      props: {
        mostResearched,
        infoBanner,
        products: products.data,
      },
    };
  });
}

const Index = (props) => {
  const LandingPageDynamic = dynamic(() => import('./landingpage'));
  return <LandingPageDynamic {...props} />;
};

export default Index;
