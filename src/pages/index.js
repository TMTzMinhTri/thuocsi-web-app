import React from 'react';
import { ProductClient } from 'clients';
import { doWithServerSide, SettingService } from 'services';
import dynamic from 'next/dynamic';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const isTotal = false;
    const [mostResearched, infoBanner, blocks, settings] = await Promise.all([
      ProductClient.loadDataMostSearch(ctx),
      ProductClient.getInfoBanner(),
      ProductClient.loadDataProductCollection(ctx, isTotal),
      SettingService.getListSetting(ctx),
    ]);
    return {
      props: {
        mostResearched,
        infoBanner,
        blocks,
        settings: settings.data ? settings.data : [],
      },
    };
  });
}

const Index = (props) => {
  const LandingPageDynamic = dynamic(() => import('./landingpage'));
  return <LandingPageDynamic {...props} />;
};

export default Index;
