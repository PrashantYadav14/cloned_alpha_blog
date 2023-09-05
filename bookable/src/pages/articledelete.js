import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ArticleDelete({ articleId }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDeleteArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/api/v1/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === 'Article deleted successfully') {
        setShowModal(false);
        navigate('/articles');
      }
    } catch (error) {
      setError('Error deleting the article. Please try again.');
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete Article
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this article?</p>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteArticle}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArticleDelete;
