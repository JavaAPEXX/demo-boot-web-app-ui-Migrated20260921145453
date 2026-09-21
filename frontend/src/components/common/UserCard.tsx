import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

const UserCardComponent = () => {
  const { user } = useAuthContext();
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCardComponent;