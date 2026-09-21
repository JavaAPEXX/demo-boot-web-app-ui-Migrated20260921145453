import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useDocument } from '../hooks/useDocument';
import { useRole } from '../hooks/useRole';
import { useUser } from '../hooks/useUser';
import { WelcomeModel } from '../types/User';

const Welcome = () => {
  const { user } = useAuthContext();
  const { data: documentData } = useDocument();
  const { data: roleData } = useRole();
  const { data: userData } = useUser();

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Document: {documentData.map((document) => document.name).join(', ')}</p>
      <p>Role: {roleData.name}</p>
      <p>User: {userData.username}</p>
    </div>
  );
};

export default Welcome;