import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthClient, isValid } from 'clients';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, REMEMBER_ME } from 'constants/Cookies';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname, push } = router;

  const setCookies = useCallback((info, rememberMe = false) => {
    const { expiredTime, bearerToken } = info;

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
      const res = await AuthClient.getUser();
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
    if (res) {
      setUser(res.data[0]);
    }
    setIsLoading(false);
  }, [setUser, setIsLoading, getUserInfo]);

  const login = (info, rememberMe) => {
    setCookies(info, rememberMe);
    loadUserFromCookies();
  };

  const logout = () => {
    setUser(null);
    Cookies.set(ACCESS_TOKEN, null);
    Cookies.set(ACCESS_TOKEN_LONGLIVE, null);
    Cookies.set(REMEMBER_ME, null);

    setCookies({}, undefined);

    push('/');
  };

  useEffect(() => {
    loadUserFromCookies();
  }, [pathname, loadUserFromCookies]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        getUserInfo,
        loadUserFromCookies,
        login,
        logout,
        isLoading,
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

export const withLogin = (Component, redirect = {}) => ({ ...props }) => {
  const router = useRouter();
  const { url, message } = redirect;
  const { isAuthenticated } = props;
  if (!isAuthenticated) {
    NotifyUtils.error(
      message && message.length > 0 ? message : 'Bạn cần đăng nhập để vào được trang này ',
    );
    router.push(url && url.length > 0 ? url : '/?login=true');
    return <LoadingScreen />;
  }
  return <Component {...props} />;
};
