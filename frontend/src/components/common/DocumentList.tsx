import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDocument } from '../hooks/useDocument';

const DocumentListComponent = () => {
  const { data: documentData } = useDocument();
  return (
    <ListGroup>
      {documentData.map((document) => (
        <ListGroup.Item key={document.id}>
          <strong>{document.name}</strong>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default DocumentListComponent;