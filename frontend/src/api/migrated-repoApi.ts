import axiosClient from './axiosClient';

const api = {
  register: async (username, password, passwordConfirm) => {
    try {
      const response = await axiosClient.post('/register', {
        username,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (username, password) => {
    try {
      const response = await axiosClient.post('/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;