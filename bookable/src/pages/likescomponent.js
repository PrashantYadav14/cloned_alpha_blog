import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const LikesComponent = ({ article_id }) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/v1/articles/${article_id}/likes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const likingUsers = response.data;
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = storedUser.id
        const likedByCurrentUser = likingUsers.some(user => user.id === currentUserId);
  
        setLiked(likedByCurrentUser);
      } catch (error) {
        console.error('Error checking if liked:', error);
      }
    };
  
    checkIfLiked();
  }, [article_id]);
  

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:3000/api/v1/articles/${article_id}/likes`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLiked(true);
      setError(null); 
    } catch (error) {
      if (error.response && error.response.data.error === "You have already liked this article") {
        setShowModal(true);
      } else {
        console.error('Error liking article:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-center">
      {liked ? (
        <Button variant="danger" >Liked</Button>
      ) : (
        <Button variant="primary" onClick={handleLike}>Like</Button>
      )}
      {/* <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>You have already liked this article</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          You have already liked this article
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default LikesComponent;
