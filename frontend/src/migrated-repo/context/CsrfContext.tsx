// [CSRF] Manages CSRF token state (Spring Security CSRF)
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CsrfContextType {
  token: string;
  parameterName: string;
  loading: boolean;
}

const CsrfContext = createContext<CsrfContextType>({
  token: '',
  parameterName: '_csrf',
  loading: true,
});

export const CsrfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState('');
  const [parameterName, setParameterName] = useState('_csrf');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        if (!response.ok) throw new Error('Failed to fetch CSRF token');
        const data = await response.json();
        setToken(data.token);
        setParameterName(data.parameterName || '_csrf');
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ token, parameterName, loading }}>
      {children}
    </CsrfContext.Provider>
  );
};

export const useCsrf = () => useContext(CsrfContext);