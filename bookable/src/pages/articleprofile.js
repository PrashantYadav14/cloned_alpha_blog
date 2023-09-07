import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikesComponent from './likescomponent'; 
import CommentsComponent from './commentscomponent';
import { Container, Navbar, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ArticleProfile() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
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
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Article Profile
        </Navbar.Brand>
      </Navbar>
      {loading ? ( 
        <div className="text-center"><Spinner animation="border" variant="primary" /></div>
      ) : article ? (
        <Card className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
          <Card.Body>
            <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {article.title}
            </Card.Title>
            <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
              {article.description}
            </Card.Text>
            {token && ( 
              <Container className="d-flex justify-content-center"> 
                <Col>
                  <Row className="justify-content-center mb-4"> 
             
                    <LikesComponent article_id={id} />
                  </Row>
                  <Row className="justify-content-center mb-4">
                    <CommentsComponent article_id={id} />
                  </Row>
                </Col>
              </Container>
            )}

          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger" className="mt-3">Article not found</Alert>
      )}
    </Container>
  );
}

export default ArticleProfile;
