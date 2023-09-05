import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormLabel, FormControl, Alert, CloseButton } from 'react-bootstrap';
import './styling.css'; 
import { useNavigate } from 'react-router-dom';

function NewArticleForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    }

    fetchCategories();
  }, []);

  const handleCreateArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/articles',
        {
          article: {
            title,
            description,
            category_ids: categoryIds,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === 'Article created successfully') {
        navigate('/articles');
      }
    } catch (error) {
      setError('Error creating the article. Please try again.');
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="article-form"> 
      <h2>Create a New Article</h2>
      {error && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <div>{error}</div>
          <CloseButton onClick={dismissError} />
        </Alert>
      )}
      <Form>
        <FormGroup controlId="title">
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="categoryIds">
          <FormLabel>Categories</FormLabel>
          <FormControl
            as="select"
            multiple
            value={categoryIds}
            onChange={(e) =>
              setCategoryIds(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <Button style={{ marginTop: '10px' }} variant="primary" onClick={handleCreateArticle}>
          Create Article
        </Button>
      </Form>
    </div>
    
  );
}

export default NewArticleForm;
