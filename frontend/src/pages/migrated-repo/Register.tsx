import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useCsrfContext } from '../context/CsrfContext';
import axiosClient from '../api/axiosClient';
import { RegisterModel } from '../types/User';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { user, error } = useAuthContext();
  const { csrfToken } = useCsrfContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosClient.post('/register', {
        username,
        password,
        passwordConfirm,
      });
      user.register(response.data);
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <div className="alert alert-danger">{error.message}</div>}
    </div>
  );
};

export default Register;