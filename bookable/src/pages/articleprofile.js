import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/likebutton';
import Comment from '../components/comment'; 

function ArticleProfile() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = `http://localhost:3000/api/v1/articles/${id}`;

    axios
      .get(API_URL)
      .then(response => {
        setArticle(response.data);
        setLoading(false); 
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
  }, [id]);

  return (
    <Container style={{ backgroundColor: '#f8f9fa', paddingTop: '20px' }}>
      <Navbar bg="dark" variant="dark" style={{ marginBottom: '20px' }}>
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Article Profile
        </Navbar.Brand>
      </Navbar>
      {loading ? ( 
        <div className="text-center">Loading...</div>
      ) : article ? (
        <Card className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
          <Card.Body>
            <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {article.title}
            </Card.Title>
            <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
              {article.description}
            </Card.Text>
            <div className="text-center">
              <LikeButton /> 
            </div>
            <div className="text-center" style={{ marginTop: '20px' }}> 
              <Comment /> 
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="alert alert-danger mt-3">Article not found</div>
      )}
    </Container>
  );
}

export default ArticleProfile;
