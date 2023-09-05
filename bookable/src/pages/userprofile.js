import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Alert } from 'react-bootstrap';
import './image.css'; // Import your CSS stylesheet

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="user-profile-bg">
      <Container className="mt-5 user-profile-container">
        <h2 className="mb-4 text-center text-primary">User Profile</h2>
        {userData ? (
          <>
            <Card className="mb-4 border border-info">
              <Card.Body>
                <Card.Title className="text-primary">Profile Information</Card.Title>
                <Card.Text>
                  <strong className="text-info">Name:</strong> {userData.username}
                </Card.Text>
                <Card.Text>
                  <strong className="text-info">Email:</strong> {userData.email}
                </Card.Text>
              </Card.Body>
            </Card>

            {userData.articles && userData.articles.length > 0 && (
              <>
                <h3 className="text-center text-success">Articles Created by {userData.username}</h3>
                {userData.articles.map(article => (
                  <Card key={article.id} className="mb-3 border border-success">
                    <Card.Body>
                      <h5 className="text-article-title">{article.title}</h5>
                      <p className="text-secondary">{article.description}</p>
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
          </>
        ) : (
          <Alert variant="danger" className="mt-3">User Data not found</Alert>
        )}
      </Container>
    </div>
  );
}

export default UserProfile;
