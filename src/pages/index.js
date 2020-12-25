import React from 'react';
import ProductClient from 'clients/ProductClient';
import { AuthClient } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(context) {
  const { loggedIn = false, user } = await AuthClient.getUserWithContext(context);

  if (loggedIn) {
    const [mostResearched, infoBanner] = await Promise.all([
      ProductClient.loadDataMostSearch(context),
      // ProductClient.loadFeedback(),
      ProductClient.getInfoBanner(),
    ]);

    return {
      props: {
        user,
        loggedIn,
        mostResearched,
        infoBanner,
      },
    };
  }

  return { props: { loggedIn } };
}

export default function Index(props) {
  return <LandingPage {...props} />;
}
