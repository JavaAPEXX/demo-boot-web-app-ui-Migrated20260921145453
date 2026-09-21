import React from 'react';
import { Badge } from 'react-bootstrap';
import { useRole } from '../hooks/useRole';

const RoleBadgeComponent = () => {
  const { data: roleData } = useRole();
  return (
    <Badge variant="primary">{roleData.name}</Badge>
  );
};

export default RoleBadgeComponent;