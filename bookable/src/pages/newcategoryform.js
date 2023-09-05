import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormLabel, FormControl, Alert, CloseButton } from 'react-bootstrap';
import './styling.css'; // Import your updated CSS file
import { useNavigate } from 'react-router-dom';

function NewCategoryForm() {
  const [name, setCategoryName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);

      if (user.admin) {
        const response = await axios.post(
          'http://localhost:3000/api/v1/categories',
          {
            name: name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === 'Category created successfully') {
          navigate('/categories');
        } else {
          setError('Error creating the category. Please try again.');
        }
      } else {
        setError('You do not have permission to create categories.');
      }
    } catch (error) {
      setError('Error creating the category. Please try again.');
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="article-form"> {/* Apply the article-form class */}
      <h2>Create a New Category</h2>
      {error && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <div>{error}</div>
          <CloseButton onClick={dismissError} />
        </Alert>
      )}
      <Form>
        <FormGroup controlId="categoryName">
          <FormLabel>Category Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter the category name"
            value={name}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormGroup>
        <Button style={{ marginTop: '10px' }} variant="primary" onClick={handleCreateCategory}>
          Create Category
        </Button>
      </Form>
    </div>
  );
}

export default NewCategoryForm;


