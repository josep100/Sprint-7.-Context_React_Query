// src/features/auth/hooks/useAuth.ts
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  loginService,
  registerService,
  logoutService,
  subscribeToAuthChanges,
} from "../services/loginService";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await loginService(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const register = async (email: string, password: string) => {
    setError(null);
    try {
      await registerService(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await logoutService();
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
};