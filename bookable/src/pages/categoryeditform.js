import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, CloseButton } from 'react-bootstrap';
import './styling.css';
import { useParams, useNavigate } from 'react-router-dom';

function CategoryEditForm() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState({
    name: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `http://localhost:3000/api/v1/categories/${categoryId}`;
    const token = localStorage.getItem('token');

    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name } = response.data.category;
        setCategory({
          name,
        });
      })
      .catch(() => {
        setError('Error fetching category data');
      });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [categoryId]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.admin) {
      setError('You are not authorized to edit categories.');
      return;
    }

    const { name } = category;
    const API_URL = `http://localhost:3000/api/v1/categories/${categoryId}`;
    const token = localStorage.getItem('token');

    axios
      .put(
        API_URL,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate('/categories');
      })
      .catch(() => {
        setError('Error updating category');
      });
  };

  return (
    <div className="article-form"> 
      <h2>Edit Category</h2>
      {error && (
        <Alert variant="danger">
          {error}
          <CloseButton onClick={handleCloseError} />
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default CategoryEditForm;
