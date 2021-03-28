/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isValid, getSessionTokenClient, getFirst } from 'clients';
import { UserService, AuthService } from 'services';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, REMEMBER_ME } from 'constants/Cookies';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';
import { useModal } from 'hooks';
import { QUICK_ORDER } from 'constants/Paths';
import { DOMAIN_TS, DOMAIN_TS_MIEN_BAC, ENV } from 'sysconfig';

import { useTranslation } from 'next-i18next';

const AuthContext = createContext({});

export const AuthProvider = ({ children, isShowingLogin, referralCode, tokenv1 }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname } = router;
  // const [isShowLogin, toggleLogin] = useModal(isShowingLogin);
  // const [isShowSignUp, toggleSignUp] = useModal(!!referralCode);
  const [isShowForgetPassword, toggleForgetPassword] = useModal();
  // const [isShowRegisterGuest, toggleRegisterGuest] = useModal(false);
  let [isShowLogin] = useModal(isShowingLogin);
  const [isShowSignUp] = useModal(!!referralCode);
  // const [isShowForgetPassword] = useModal();
  const [isShowRegisterGuest] = useModal(false);

  const [isShowGuestExpiredTime, toggleShowGuestExpiredTime] = useModal();

  const { t } = useTranslation('apiErrors');

  // hanler redirect v1
  let toggleLogin = () => (window.location.href = `${DOMAIN_TS}?login=true`);
  const toggleSignUp = () => (window.location.href = `${DOMAIN_TS}?signup=true`);
  const toggleRegisterGuest = () => (window.location.href = `${DOMAIN_TS}?signup=true`);

  // dev
  if (ENV !== 'prd') {
    [isShowLogin, toggleLogin] = useModal(isShowingLogin);
  }

  const handleChangeForget = useCallback(() => {
    // toggleLogin();
    // toggleForgetPassword();

    // redirect to mienbac.thuocsi.vn
    window.location.href = DOMAIN_TS;
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    // redirect to mienbac.thuocsi.vn
    window.location.href = DOMAIN_TS;

    // toggleSignUp();
    // toggleLogin();
  }, [toggleSignUp, toggleLogin]);

  const handleChangeSignUp = useCallback(() => {
    // redirect to mienbac.thuocsi.vn
    window.location.href = DOMAIN_TS;

    // toggleLogin();
    // toggleSignUp();
  }, [toggleLogin, toggleSignUp]);

  const handleChangeRegisterGuest = useCallback(() => {
    // toggleLogin();
    // toggleRegisterGuest();

    // redirect to mienbac.thuocsi.vn
    window.location.href = DOMAIN_TS;
  }, [toggleLogin, toggleRegisterGuest]);

  const setCookies = useCallback((info, rememberMe = false) => {
    const { expiredTime = new Date(), bearerToken = null } = info;
    Cookies.set(ACCESS_TOKEN, bearerToken);
    Cookies.set(REMEMBER_ME, rememberMe);
    if (rememberMe) {
      const DateExpired = new Date(expiredTime);
      Cookies.set(ACCESS_TOKEN_LONGLIVE, bearerToken, {
        expires: DateExpired,
      });
    }
  }, []);

  const getUserInfo = useCallback(async () => {
    try {
      const ss = getSessionTokenClient();
      if (!ss || ss.length === 0) return null;

      const res = await UserService.getAccount();
      if (isValid(res)) {
        return res;
      }

      Cookies.remove(ACCESS_TOKEN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return null;
  }, []);

  const setInfoUser = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(!!userInfo);
  };

  const logout = (callback) => {
    setInfoUser(null);
    setCookies({}, true);
    if (typeof callback === 'function') {
      return callback();
    }
    // window.location.href = '/';

    // redirect to mienbac.thuocsi.vn
    window.location.href = DOMAIN_TS;

    return false;
  };

  const loadUserFromCookies = useCallback(
    async (callback) => {
      const res = await getUserInfo();
      const userInfo = getFirst(res, null);
      // check guest user expireAt
      if (userInfo && userInfo.isQuest) {
        const timeRemaining = new Date(userInfo.expireAt).getTime() - new Date().getTime();

        // time remaining
        // console.log("time remaining: ", `${Math.floor(timeRemaining/1000/60)  }m`);
        setTimeout(
          () =>
            logout(() => {
              if (router.pathname !== '/') {
                router.push('/');
              }
              toggleShowGuestExpiredTime();
            }),
          timeRemaining,
        );
      } else {
        // redirect to mienbac.thuocsi.vn
        // window.location.href = DOMAINT_TS;
      }

      setInfoUser(userInfo);
      setIsLoading(false);
      if (callback) callback(userInfo);
    },
    [getUserInfo, setIsLoading],
  );

  const login = (info, rememberMe) => {
    setCookies(info, rememberMe);
    loadUserFromCookies();
  };

  const handleLogin = ({ username, password, rememberMe, success, type = 'CUSTOMER' }) => {
    AuthService
      // .loginLocal({ username, password, remember: rememberMe });
      .login({ username, password, type, remember: rememberMe })

      .then((result) => {
        if (!isValid(result)) {
          const errorCode = `login.${result.errorCode}`;
          NotifyUtils.error(t(errorCode));
          return;
        }

        NotifyUtils.success(t('login.success'));

        const userInfo = getFirst(result);
        login(userInfo, rememberMe === '');

        // callback
        if (success) {
          success();
          if (router.pathname === '/') {
            router.push(QUICK_ORDER);
          }
        }
      })
      .catch(() => {
        NotifyUtils.error(t('error'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterGuest = (data, success) => {
    setIsLoading(true);
    AuthService.registerGuest(data)
      .then((result) => {
        if (!isValid(result)) {
          switch (result.errorCode) {
            case 'ACCOUNT_NOT_ACCEPTED':
              NotifyUtils.error('Tài khoản này đã được đăng ký dùng thử. Bạn không thể tiếp tục');
              toggleRegisterGuest(false);
              toggleLogin();
              break;
            default:
              NotifyUtils.error(result.message);
              toggleRegisterGuest(false);
              toggleLogin();
          }
          return;
        }
        const { phone } = getFirst(result);
        const userName = `guest${phone}`;
        handleLogin({ username: userName, password: `Guest${phone}`, type: 'GUEST' });
        setIsLoading(false);
        toggleRegisterGuest(false);
        // callback
        if (success) {
          success();
          if (router.pathname === '/') {
            router.push(QUICK_ORDER);
          }
        }
      })
      .catch(() => {
        NotifyUtils.error(t('error'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResetPassword = useCallback(async (data) => {
    const result = await AuthService.resetPassword(data);
    if (isValid(result)) {
      NotifyUtils.info(result.message);
    } else {
      const errorCode = `login.${result.errorCode}`;
      NotifyUtils.error(t(errorCode));
    }
  }, []);

  useEffect(() => {
    if (user === null)
      loadUserFromCookies(async (userInfo) => {
        // nếu không có user thì check token
        if (!userInfo)
          if (tokenv1) {
            // redirect
            const result = await AuthService.loginv1({ tokenv1 });
            // console.log('result login v1 ', result);
            if (isValid(result)) {
              NotifyUtils.info(result.message);
              login(getFirst(result), true);
              router.push('/');
            } else {
              const errorCode = `login.${result.errorCode}`;
              NotifyUtils.error(result.message || t(errorCode));

              // redirect to mienbac.thuocsi.vn
              window.location.href = DOMAIN_TS_MIEN_BAC;
            }
          } else if (ENV === 'prd') {
            window.location.href = DOMAIN_TS;
          }
      });
  }, [pathname, loadUserFromCookies, tokenv1]);

  // useEffect(() => {
  //   const loadUserV1 = async () => {
  //     const result = await AuthService.loginv1({ tokenv1 });
  //     console.log('result login v1 ', result);
  //     if (isValid(result)) {
  //       NotifyUtils.info(result.message);
  //       const userInfo = getFirst(result);
  //       login(userInfo, true);
  //       router.push('/');
  //     } else {
  //       const errorCode = `login.${result.errorCode}`;
  //       NotifyUtils.error(result.message || t(errorCode));

  //       // redirect to mienbac.thuocsi.vn
  //       window.location.href = DOMAINT_TS;
  //     }
  //   };
  //   if (tokenv1 && !isAuthenticated) {
  //     loadUserV1();
  //   }
  // }, [tokenv1]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        handleLogin,
        handleRegisterGuest,
        logout,
        isLoading,
        isShowLogin,
        toggleLogin,
        isShowSignUp,
        toggleSignUp,
        isShowForgetPassword,
        toggleForgetPassword,
        isShowRegisterGuest,
        toggleRegisterGuest,
        isShowGuestExpiredTime,
        toggleShowGuestExpiredTime,
        handleChangeForget,
        handleChangeSignIn,
        handleChangeSignUp,
        handleChangeRegisterGuest,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const LoadingRoute = ({ children }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
};
