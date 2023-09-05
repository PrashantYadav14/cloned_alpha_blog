import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, CloseButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function ArticleEditForm() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState({
    title: '',
    description: '',
    user_id: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `http://localhost:3000/api/v1/articles/${articleId}`;
    const token = localStorage.getItem('token'); 

    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { title, description, user_id } = response.data;
        setArticle({
          title,
          description,
          user_id,
        });
      })
      .catch(() => {
        setError('Error fetching article data');
      });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [articleId]);

  const handleChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || user.id !== article.user_id) {
      setError('You are not authorized to edit this article.');
      return;
    }

    const { title, description } = article;
    const API_URL = `http://localhost:3000/api/v1/articles/${articleId}`;
    const token = localStorage.getItem('token'); 

    axios
      .put(
        API_URL,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then(() => {
        
        navigate('/articles');
      })
      .catch(() => {
        setError('Error updating article');
      });
  };

  return (
    <div className="article-form"> 
      <h2>Edit Article</h2>
      {error && (
        <Alert variant="danger">
          {error}
          <CloseButton onClick={handleCloseError} />
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            name="description"
            value={article.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default ArticleEditForm;


