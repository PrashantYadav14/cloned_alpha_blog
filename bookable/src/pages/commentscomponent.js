import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CommentsComponent = ({ article_id }) => {
  const [comment, setComment] = useState('');

  const handleComment = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.post(`/api/v1/articles/${article_id}/comments`, { content: comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComment('');
    } catch (error) {
      console.error('Error commenting on article:', error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="commentArea" className="mb-4"> 
          <Form.Control
            as="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment here"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleComment} className="d-block mx-auto">Submit Comment</Button>
      </Form>
    </div>
  );
};

export default CommentsComponent;
