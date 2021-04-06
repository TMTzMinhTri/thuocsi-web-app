import React from 'react';
import { ProductClient, MarketingClient, getFirst } from 'clients';
import { doWithServerSide, ProductService, SettingService } from 'services';

import dynamic from 'next/dynamic';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [settingsResult, mostResearched, infoBanner, blocks] = await Promise.all([
      SettingService.getListSetting({ ctx }),
      ProductClient.loadDataMostSearch(ctx),
      MarketingClient.getListBanner(ctx),
      ProductService.loadDataProductCollection(ctx),
    ]);
    return {
      props: {
        mostResearched,
        infoBanner: infoBanner?.data || [],
        blocks,
        settings: getFirst(settingsResult),
      },
    };
  });
}

const Index = (props) => {
  const LandingPageDynamic = dynamic(() => import('./landingpage'));
  return <LandingPageDynamic {...props} />;
};

export default Index;
