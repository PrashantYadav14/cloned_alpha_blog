import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    let mounted = true;
    const API_URL = "http://localhost:3000/api/v1/articles";
    axios.get(API_URL).then((response) => {
      if (mounted) {
        setArticles(response.data);
      }
    });

    return () => {
      mounted = false; 
    };
  }, []);

  const handleDeleteClick = (article) => {
    
    setShowConfirmationModal(true);
    setArticleToDelete(article);
  };

  const confirmDelete = () => {
   
    const DELETE_URL = `http://localhost:3000/api/v1/articles/${articleToDelete.id}`;
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    axios
      .delete(DELETE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {

        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleToDelete.id));
        setShowConfirmationModal(false);
        setArticleToDelete(null);
      })
      .catch((error) => {
        console.error('Error deleting article:', error);
       
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setArticleToDelete(null);
  };

  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Container style={{ backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
      <Navbar style={{backgroundColor:'#194019', marginBottom: '20px' }}>
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Alpha Blog Articles
        </Navbar.Brand>
      </Navbar>
      <div className="mt-4">
        {articles && articles.map((article) => (
          <Card key={article.id} className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {article.title}
              </Card.Title>
              <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
                {article.description}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={`/articles/${article.id}`}>
                  <Button variant="success" className="mr-2">View</Button>
                </Link>
                {token && ( 
                  <div>
                    {(storedUser && (storedUser.id === article.user_id || storedUser.admin)) ? (
                      <>
                        <Button variant="danger" className="mx-2" onClick={() => handleDeleteClick(article)}>Delete</Button>
                        <Link to={`/articles/${article.id}/edit`}>
                          <Button variant="primary" className="ml-2">Edit</Button>
                        </Link>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Articles;

