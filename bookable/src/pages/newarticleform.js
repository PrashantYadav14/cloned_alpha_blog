import React, { useState } from 'react';
import axios from 'axios';
import './styling.css';
const NewArticleForm = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const authToken = 'your-auth-token'; // Replace with the actual authentication token
      const response = await axios.post('http://localhost:3000/api/v1/articles', articleData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response here (e.g., show a success message)
      console.log('Article created:', response.data);
    } catch (error) {
      // Handle error here (e.g., show an error message)
      console.error('Error creating article:', error.message);
    }
  };

  return (
    <div className="article-form">
    <h2>Create a New Article</h2>
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={articleData.title}
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={articleData.description}
        onChange={handleInputChange}
      />
      <button type="submit">Create Article</button>
    </form>
  </div>
  );
};

export default NewArticleForm;
