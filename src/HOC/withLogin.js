import React from 'react';
import { NotifyUtils } from 'utils';
import LoadingScreen from 'components/organisms/LoadingScreen';
import Router from 'next/router';

export const withLogin = (Component, redirect = {}) => ({ ...props }) => {
  const { url, message } = redirect;
  const { isAuthenticated } = props;
  if (!isAuthenticated) {
    NotifyUtils.error(
      message && message.length > 0 ? message : 'Bạn cần đăng nhập để vào được trang này ',
    );

    Router.push(url && url.length > 0 ? url : '/?login=true');
    // window.location.href = url && url.length > 0 ? url : '/?login=true';
    return <LoadingScreen />;
  }

  return <Component {...props} />;
};

export default withLogin;
