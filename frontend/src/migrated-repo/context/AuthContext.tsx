// [AUTH] Consumes user-session model attributes (login.jsp, welcome.jsp)
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  message: string;
  error: string;
  login: (user: User) => void;
  logout: () => void;
  setMessage: (msg: string) => void;
  setError: (err: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  message: '',
  error: '',
  login: () => {},
  logout: () => {},
  setMessage: () => {},
  setError: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
    setMessage('');
    setError('');
  };

  const logout = () => {
    setUser(null);
    setMessage('');
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, message, error, login, logout, setMessage, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);