import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthClient, isValid } from 'clients';
import { Cookies } from 'utils';

const COOKIE_AUTH_NAME = 'thuocsi_authen';
const COOKIE_AUTH_TYPE = 'thuocsi_type';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname, push } = router;

  const setCookies = (info, isRememberMe) => {
    if (isRememberMe) {
      // eslint-disable-next-line no-console
      console.log('AUTH: set Cookies');
    }
    Cookies.set(COOKIE_AUTH_NAME, info.bearerToken);
    Cookies.set(COOKIE_AUTH_TYPE, info.type);
  };

  const getUser = async () => {
    try {
      setIsLoading(true);
      const Authorization = Cookies.get(COOKIE_AUTH_NAME);
      const res = await AuthClient.getUser(Authorization);
      if (isValid(res)) {
        const info = res.data[0];
        setUser(info);
      } else {
        setUser(null);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setCookies({}, undefined);
    push('/');
  };

  // useEffect(() => {
  //   getUser();
  // }, [getUser]);

  useEffect(() => {
    getUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, getUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
