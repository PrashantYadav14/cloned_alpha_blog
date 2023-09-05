import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Comment = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to handle the comment submission here
    console.log('Comment submitted:', comment);
    setComment('');
  };

  return (
    <div > {/* Add margin-bottom for spacing */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Control
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Comment
        </Button>
      </Form>
    </div>
  );
};

export default Comment;
