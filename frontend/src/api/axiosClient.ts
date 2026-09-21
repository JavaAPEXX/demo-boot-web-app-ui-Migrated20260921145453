import axios from 'axios';
import { CsrfContext } from '../context/CsrfContext';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  interceptor: (config) => {
    const csrfToken = CsrfContext.Consumer().useValue.csrfToken;
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
});

export default axiosClient;