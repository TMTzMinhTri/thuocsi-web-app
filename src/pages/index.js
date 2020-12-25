import React from 'react';
import ProductClient from 'clients/ProductClient';
import { AuthClient } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(context) {
  const { isAuthenticated = false, user } = await AuthClient.getUserWithContext(context);

  if (isAuthenticated) {
    const [mostResearched, infoBanner] = await Promise.all([
      ProductClient.loadDataMostSearch(context),
      // ProductClient.loadFeedback(),
      ProductClient.getInfoBanner(),
    ]);

    return {
      props: {
        user,
        isAuthenticated,
        mostResearched,
        infoBanner,
      },
    };
  }

  return { props: { isAuthenticated } };
}

export default function Index(props) {
  return <LandingPage {...props} />;
}
