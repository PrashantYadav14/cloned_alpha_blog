import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';

const linkStyle = {
  textDecoration: 'underline',
  color: '#2ecc71',
};

function CategoryProfile() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories/${id}`)
      .then((response) => {
        setCategoryData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="user-profile-bg">
      <Container className="mt-5 user-profile-container">
        <h2 className="mb-4 text-center text-primary">Category Profile</h2>
        <Card className="mb-4 border border-info">
          <Card.Body className="text-center">
            {isLoading ? (
              <Spinner animation="border" variant="info" />
            ) : error ? (
              <Alert variant="danger" className="mt-3">
                Category Data not found
              </Alert>
            ) : (
              categoryData && (
                <>
                  <p className="mb-2">
                    <strong>
                      <span className="category-name" style={{ color: '#1e6e9b', fontSize: '24px' }}>
                        {categoryData.category.name}
                      </span>
                    </strong>
                  </p>
                </>
              )
            )}
          </Card.Body>
        </Card>
        {categoryData && categoryData.articles && categoryData.articles.length > 0 && (
          <Card className="mb-4 border border-success">
            <Card.Body className="text-center">
              <h3 style={{ color: '#4a90e2' }}>Articles</h3>
              <ListGroup className="mt-3">
                {categoryData.articles.map((article, index) => (
                  <div key={article.id} className="mb-3">
                    <h5 className="text-article-title">{article.title}</h5>
                    <Link to={`/articles/${article.id}`} style={linkStyle}>
                      <Button variant="success">View</Button>
                    </Link>
                  </div>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default CategoryProfile;


