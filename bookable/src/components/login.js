
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './signup.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        user: { email, password }
      });
      if (response.data.message === 'Logged in successfully') {
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

       
        const userId = response.data.user.id;
        const profileUrl = `/users/${userId}`;
        navigate(profileUrl);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleCloseAlert = () => {
    setLoginError(false);
  };

  return (
    <div className="signup-page">
      <Form onSubmit={handleLogin} className="signup-form">
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
          Log In
        </Button>
      </Form>
      
      {loginError && (
        <Alert variant="danger" className="mt-3" onClose={handleCloseAlert} dismissible>
          Invalid email or password
        </Alert>
      )}
    </div>
  );
}

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
// import './signup.css';
// import { useAuth } from "./AuthContext"; 

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(false); // New state variable
//   const navigate = useNavigate();
//   const { login } = useAuth(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/login', {
//         user: { email, password }
//       });
//       if (response.data.message === 'Logged in successfully') {
//         //console.log(response);
//         localStorage.setItem('user', response.data.user.id);
//         localStorage.setItem('token', response.data.token);

//         login(response.data.user);
//         const userId = response.data.user.id;
//         const profileUrl = `/users/${userId}`;
//         navigate(profileUrl);
//       }
//     } catch (error) {

//       setLoginError(true);
//     }
//   };
//   const handleCloseAlert = () => {
//     setLoginError(false);
//   };

//   return (
//     <div className="signup-page">
//       <Form onSubmit={handleLogin} className="signup-form">
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="signup-button">
//           Log In
//         </Button>
//       </Form>
      
//       {loginError && (
//         <Alert variant="danger" className="mt-3" onClose={handleCloseAlert} dismissible>
//         Invalid email or password
//       </Alert>
//       )}
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import './signup.css';
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/login', {
//         user: { email, password } });
//       if (response.data.message === "Logged in successfully") {
//         const userId = response.data.user.id;    
//         const profileUrl = `/users/${userId}`;
//         navigate(profileUrl);
//       }
//     } catch (error) {
//       setError('Invalid email or password');
//     }
//   };
//   return (
//     <div className="signup-page"> {/* Add a new container */}
//     <Form onSubmit={handleLogin} className="signup-form">
     
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
//         Log In
//       </Button>
//     </Form>
//     </div>
//   );
// }
// export default Login;
