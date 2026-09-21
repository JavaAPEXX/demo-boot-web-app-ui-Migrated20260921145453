import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useCsrfContext } from '../context/CsrfContext';
import axios from 'axios';
import { useDocument } from '../hooks/useDocument';
import { useRole } from '../hooks/useRole';
import { useUser } from '../hooks/useUser';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationModel } from '../types/User';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { user, error } = useAuthContext();
  const { csrfToken } = useCsrfContext();
  const { data: documentData } = useDocument();
  const { data: roleData } = useRole();
  const { data: userData } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        passwordConfirm,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-TOKEN': csrfToken,
        },
      });
      if (response.status === 201) {
        // Handle successful registration
      } else {
        // Handle registration error
      }
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <div>
      <RegistrationForm
        username={username}
        password={password}
        passwordConfirm={passwordConfirm}
        handleSubmit={handleSubmit}
      />
      {error && <div className="alert alert-danger">{error.message}</div>}
    </div>
  );
};

export default Registration;