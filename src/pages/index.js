import React from 'react';
import { ProductClient, MarketingClient } from 'clients';
import { doWithServerSide, SettingService } from 'services';
import dynamic from 'next/dynamic';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const isTotal = false;
    const [settingsResult, mostResearched, infoBanner, blocks] = await Promise.all([
      SettingService.getListSetting({ ctx }),
      ProductClient.loadDataMostSearch(ctx),
      MarketingClient.getListBanner(ctx),
      ProductClient.loadDataProductCollection(ctx, isTotal),
    ]);
    return {
      props: {
        mostResearched,
        infoBanner: infoBanner?.data || [],
        blocks,
        settings: settingsResult.data ? settingsResult.data : [],
      },
    };
  });
}

const Index = (props) => {
  const LandingPageDynamic = dynamic(() => import('./landingpage'));
  return <LandingPageDynamic {...props} />;
};

export default Index;
