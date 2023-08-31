import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './signup.css'; // Create a separate CSS file for styling
import { useAuth } from './AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup', {
        user: { username, email, password },
      });
      if (response.data.message === 'Signed up successfully') {
        const { token, user } = response.data; // Assuming your API returns user details
        login({ token, ...user }); // Use the login function from context
        const usersUrl = '/users';
        navigate(usersUrl);
      }
    } catch (error) {
      setError('Error signing up');
    }
  };

  const handleCloseAlert = () => {
    setError('');
  };

  return (
    <div className="signup-page">
      {error && (
        <Alert variant="danger" className="mt-3" onClose={handleCloseAlert} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSignup} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="signup-button">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './signup.css'; // Create a separate CSS file for styling

// function Signup({  }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/signup', {
//         user: { username, email, password },
//       });
//       if (response.data.message === 'Signed up successfully') {
//         const usersUrl = "/users";
//         navigate(usersUrl);
//       }
//     } catch (error) {
//       setError('Error signing up');
//     }
//   };

//   return (
//     <div className="signup-page"> {/* Add a new container */}
//     <Form onSubmit={handleSignup} className="signup-form">
//       <Form.Group className="mb-3" controlId="formBasicUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" className="signup-button">
//         Sign Up
//       </Button>
//     </Form>
//     </div>
//   );
// }

// export default Signup;

