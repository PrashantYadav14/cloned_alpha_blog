import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';

const CommentsComponent = ({ article_id }) => {
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const checkIfCommented = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/v1/articles/${article_id}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const loggedInUserId = storedUser.id
    
       const hasCommented = response.data.some(comment => comment.user.id === loggedInUserId);
       setCommented(hasCommented);
      } catch (error) {
        console.error('Error checking if commented:', error);
      }
    };

    checkIfCommented();
  }, [article_id]);

  const handleComment = async () => {
    try {
      const token = localStorage.getItem("token"); 

      if (comment.trim() === "") {
        setShowAlert(true);
        setAlertMessage("You cannot submit a blank comment");
        return;
      }

      if (commented) {
        setShowAlert(true);
        setAlertMessage("You have already commented on this article.");
        return;
      }

      await axios.post(`http://localhost:3000/api/v1/articles/${article_id}/comments`, { content: comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComment('');
    } catch (error) {
      console.error('Error commenting on article:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
          rows="4"
          cols="50"
        />
      </div>
      <Button variant="primary" onClick={handleComment} disabled={commented}>
        {commented ? "Already Commented" : "Submit Comment"}
      </Button>

      {showAlert && (
        <Alert variant="warning" onClose={handleCloseAlert} dismissible className="position-absolute top-50 start-50 translate-middle">
          {alertMessage}
        </Alert>
      )}
    </div>
  );

};

export default CommentsComponent;
