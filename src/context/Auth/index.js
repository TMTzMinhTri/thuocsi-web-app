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

import { useTranslation } from 'next-i18next';

const AuthContext = createContext({});

export const AuthProvider = ({ children, isShowingLogin, referralCode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname } = router;
  const [isShowLogin, toggleLogin] = useModal(isShowingLogin);
  const [isShowSignUp, toggleSignUp] = useModal(!!referralCode);
  const [isShowForgetPassword, toggleForgetPassword] = useModal();
  const [isShowRegisterGuest, toggleRegisterGuest] = useModal(false);
  const [isShowGuestExpiredTime, toggleShowGuestExpiredTime] = useModal();

  const { t } = useTranslation('apiErrors');

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);

  const handleChangeSignUp = useCallback(() => {
    toggleLogin();
    toggleSignUp();
  }, [toggleLogin, toggleSignUp]);

  const handleChangeRegisterGuest = useCallback(() => {
    toggleLogin();
    toggleRegisterGuest();
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
    window.location.href = '/';
    return false;
  };

  const loadUserFromCookies = useCallback(async () => {
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
    }

    setInfoUser(userInfo);
    setIsLoading(false);
  }, [getUserInfo, setIsLoading]);

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
          if (result.errorCode === 'CUSTOMER_EXISTED') {
            NotifyUtils.error(result.message);
            toggleRegisterGuest(false);
            toggleLogin();
          } else {
            const errorCode = `login.${result.errorCode}`;
            NotifyUtils.error(t(errorCode));
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
    if (user === null) loadUserFromCookies();
  }, [pathname, loadUserFromCookies]);

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
