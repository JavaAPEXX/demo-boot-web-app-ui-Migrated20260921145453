// [CSRF] Manages CSRF token state (Spring Security CSRF)
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CsrfContextType {
  token: string | null;
  parameterName: string;
  loading: boolean;
  error: string | null;
}

const CsrfContext = createContext<CsrfContextType>({
  token: null,
  parameterName: '_csrf',
  loading: true,
  error: null,
});

export const CsrfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [parameterName, setParameterName] = useState<string>('_csrf');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }
        const data = await response.json();
        setToken(data.token);
        setParameterName(data.parameterName || '_csrf');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ token, parameterName, loading, error }}>
      {children}
    </CsrfContext.Provider>
  );
};

export const useCsrf = () => useContext(CsrfContext);