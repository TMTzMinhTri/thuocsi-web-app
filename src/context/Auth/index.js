import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthClient, isValid } from 'clients';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, REMEMBER_ME } from 'constants/Cookies';
import LoadingScreen from 'components/organisms/LoadingScreen';

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

    const DateExpired = new Date(expiredTime);
    if (rememberMe) {
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

  const login = (info) => {
    setCookies(info, true);
    loadUserFromCookies();
  };

  const logout = () => {
    setUser(null);
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

export const ProtectRoute = ({ children }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
};
