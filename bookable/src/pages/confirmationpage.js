import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  let { confirmation_token } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/confirmation?confirmation_token=${confirmation_token}`)
      .then((response) => {

      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, [confirmation_token]);

  return (
    <div >
      <h1>Email Confirmation Page</h1>
      {error && <p>Error: {error}</p>}
      
      {!error && (
        <div>
          <p>Congratulations! Your account is now activated.</p>
          <Link to="/login">Navigate to Login Page</Link>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
