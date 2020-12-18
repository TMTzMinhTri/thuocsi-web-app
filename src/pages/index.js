import React from 'react';
import ProductClient from 'clients/ProductClient';
import { AuthClient } from 'clients';
import LandingPage from './landingpage/index';

export async function getServerSideProps(context) {
  const { loggedIn, user } = await AuthClient.getUserWithContext(context);

  if (loggedIn) {
    const [mostResearched, feedback, infoBanner] = await Promise.all([
      ProductClient.loadDataMostSearch(context),
      ProductClient.loadFeedback(context),
      ProductClient.getInfoBanner(context),
    ]);

    return {
      props: {
        user,
        loggedIn,
        mostResearched,
        feedback,
        infoBanner,
      },
    };
  }

  return { loggedIn };
}

export default function Index(props) {
  return <LandingPage {...props} />;
}
