import React from 'react';
import { NotifyUtils } from 'utils';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { removeSessionToken } from 'clients';
// import Router from 'next/router';

export const withLogin = (Component, checkLogin = true, redirect = {}) => ({ ...props }) => {
  const { url, message } = redirect;
  const { isAuthenticated, isInvalidToken } = props;
  let msg = '';
  if (checkLogin && !isAuthenticated) {
    msg = message && message.length > 0 ? message : 'Bạn cần đăng nhập để vào được trang này ';
  } else if (isInvalidToken) {
    // server side
    // when user click other page , do with server side run -> check inValidToken
    msg =
      message && message.length > 0
        ? message
        : 'Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại để có thể tiếp tục thao tác ';
  }

  if (msg && msg.length > 0) {
    removeSessionToken();
    NotifyUtils.error(msg);
    // Router.push(url && url.length > 0 ? url : '/?login=true');
    setTimeout(() => {
      window.location.href = url && url.length > 0 ? url : '/?login=true';
    }, 2000);

    return <LoadingScreen />;
  }

  return <Component {...props} />;
};

export default withLogin;
