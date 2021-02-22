import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthClient, isValid, getSessionTokenClient, getFirst } from 'clients';
import { UserService } from 'services';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, REMEMBER_ME } from 'constants/Cookies';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';
import { useModal } from 'hooks';
import { QUICK_ORDER } from 'constants/Paths';

import { i18n } from 'i18n-lib';

const AuthContext = createContext({});

export const AuthProvider = ({ children, isShowingLogin }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname, push } = router;
  const [isShowLogin, toggleLogin] = useModal(isShowingLogin);
  const [isShowSignUp, toggleSignUp] = useModal();
  const [isShowForgetPassword, toggleForgetPassword] = useModal();

  const { t } = i18n.useTranslation(['apiErrors']);

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
      if (!ss || ss.length === 0) {
        return null;
      }
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

  const loadUserFromCookies = useCallback(async () => {
    const res = await getUserInfo();

    if (isValid(res)) {
      const userInfo = getFirst(res);
      setUser(userInfo);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  }, [setUser, setIsLoading, getUserInfo]);

  const login = (info, rememberMe) => {
    setCookies(info, rememberMe);
    loadUserFromCookies();
  };

  const handleLogin = ({ username, password, rememberMe, success }) => {
    AuthClient.login({ username, password })
      .then((result) => {
        if (!isValid(result)) {
          const errorCode = `login.${result.errorCode}`;
          NotifyUtils.error(t(errorCode));
          return;
        }

        NotifyUtils.success(t('login.success'));
        const userInfo = result?.data[0];
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

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCookies({}, true);
    push('/');
  };

  useEffect(() => {
    loadUserFromCookies();
  }, [pathname, loadUserFromCookies]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        getUserInfo,
        loadUserFromCookies,
        login,
        handleLogin,
        logout,
        isLoading,
        isShowLogin,
        toggleLogin,
        isShowSignUp,
        toggleSignUp,
        isShowForgetPassword,
        toggleForgetPassword,
        handleChangeForget,
        handleChangeSignIn,
        handleChangeSignUp,
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
