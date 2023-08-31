import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CategoryProfile() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch category data using the id parameter
    axios.get(`http://localhost:3000/api/v1/categories/${id}`) // Corrected URL
      .then(response => {
        setCategoryData(response.data); // Corrected variable name
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);
  return (
    <div className="container mt-5">
    <div className="card border-info">
      <div className="card-header bg-info text-white">
        <h2 className="mb-0 text-center">Category Profile</h2>
      </div>
      <div className="card-body text-center"> {/* Center content */}
        {categoryData ? (
          <>
            <p className="mb-2">
              <strong>
                <span style={{ color: '#3498db', fontWeight: 'bold', fontSize: '24px' }}>{categoryData.category.name}</span>
              </strong>
            </p>
            <h3>Articles associated with this category:</h3>
            <ul className="list-group mt-3">
              {categoryData.articles.map(article => (
                <li key={article.id} className="list-group-item">
                  {article.title}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="alert alert-danger mt-3">Category Data not found</div>
        )}
      </div>
    </div>
  </div>

  );
}

export default CategoryProfile;
