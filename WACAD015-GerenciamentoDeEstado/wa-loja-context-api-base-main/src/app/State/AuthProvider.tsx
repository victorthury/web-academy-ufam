"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  email: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authLocalStorage = localStorage.getItem("user");

    if (authLocalStorage) {
      setEmail(authLocalStorage);
    }
  }, []);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem("user", email);
    router.push("/");
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const values = {
    email,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default AuthProvider;
