import React, { useState } from 'react';
import axios from 'axios';
import './styling.css';

const NewCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCategoryName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const authToken = 'your-auth-token'; // Replace with the actual authentication token
      const response = await axios.post('http://localhost:3000/api/v1/categories', {
        name: categoryName
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response here (e.g., show a success message)
      console.log('Category created:', response.data);
    } catch (error) {
      // Handle error here (e.g., show an error message)
      console.error('Error creating category:', error.message);
    }
  };

  return (
    <div className="article-form">
      <h2>Create a New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          className="form-input"
          value={categoryName}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="form-button">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
