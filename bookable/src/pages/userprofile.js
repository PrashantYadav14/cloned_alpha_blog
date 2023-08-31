import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data using the id parameter
    axios.get(`http://localhost:3000/api/v1/users/${id}`)
      .then(response => {
        setUserData(response.data); // Assuming the fetched data is stored in response.data
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#3498db' }}>User Profile</h2>
      {userData ? (
        <div className="card p-4 border border-info">
          <p className="mb-2">
            <strong>Name:</strong> {userData.username}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          
        </div>
      ) : (
        <div className="alert alert-danger mt-3">User Data not found</div>
      )}
    </div>
  );
}

export default UserProfile;
