import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, CloseButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './styling.css'
function UserEditForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
    
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `http://localhost:3000/api/v1/users/${userId}`;
    const token = localStorage.getItem('token'); 

    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const { username, email } = response.data;
        setEditedUser({
          username,
          email,
         
        });
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();
    


    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [userId]);

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userIdAsInt = parseInt(userId, 10);
    if (!user.id || user.id !== userIdAsInt) {
      setError('You are not authorized to edit this user.');
      return;
    }

    const API_URL = `http://localhost:3000/api/v1/users/${userId}`;
    const token = localStorage.getItem('token'); 

    try {
      await axios.put(
        API_URL,
        {
          user: editedUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      navigate('/users');
    } catch (error) {
      setError('Error updating user');
    }
  };

  return (
    <div className="article-form"> 
      <h2>Edit User</h2>
      {error && (
        <Alert variant="danger">
          {error}
          <CloseButton onClick={handleCloseError} />
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
            />
          </Form.Group>
       
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default UserEditForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert, CloseButton } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';

// function UserEditForm() {
//   const { userId } = useParams();
//   const navigate = useNavigate(); // Use navigate to handle redirection
//   const [user, setUser] = useState(null);
//   const [editedUser, setEditedUser] = useState({
//     username: '',
//     email: '',
//     // Add other user fields here as needed
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const API_URL = `http://localhost:3000/api/v1/users/${userId}`;

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         const { username, email } = response.data;
//         setEditedUser({
//           username,
//           email,
//           // Set other user fields here as needed
//         });
//       } catch (error) {
//         setError('Error fetching user data');
//       }
//     };

//     fetchUserData();

//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     setEditedUser({
//       ...editedUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCloseError = () => {
//     setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userIdAsInt = parseInt(userId, 10);
//     if (!user.id || (user.id !== userIdAsInt)) {
//       setError('You are not authorized to edit this user.');
//       return;
//     }
  
//     if (user.id !== userIdAsInt) {
//       setError('You can only edit your own profile.');
//       return;
//     }
  
//     const API_URL = `http://localhost:3000/api/v1/users/${userId}`;
  
//     try {
//       await axios.put(API_URL, {
//         user: editedUser,
        
//       });
//       // Redirect to the users page on success using navigate
//       navigate('/users');
//     } catch (error) {
//       setError('Error updating user');
//     }
//   };
  

//   return (
//     <div>
//       <h2>Edit User</h2>
//       {error && (
//         <Alert variant="danger">
//           {error}
//           <CloseButton onClick={handleCloseError} />
//         </Alert>
//       )}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             name="username"
//             value={editedUser.username}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={editedUser.email}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         {/* Add other form fields for user data here as needed */}
//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default UserEditForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert, CloseButton } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';

// function UserEditForm() {
//   const { userId } = useParams();
//   const navigate = useNavigate(); // Use navigate to handle redirection
//   const [user, setUser] = useState(null);
//   const [editedUser, setEditedUser] = useState({
//     username: '',
//     email: '',
//     // Add other user fields here as needed
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const API_URL = `http://localhost:3000/api/v1/users/${userId}`;

//     axios.get(API_URL).then((response) => {
//       const { username, email } = response.data;
//       setEditedUser({
//         username,
//         email,
//         // Set other user fields here as needed
//       });
//     });

//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     setEditedUser({
//       ...editedUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCloseError = () => {
//     setError(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!user || (user.id !== userId && !user.admin)) {
//       setError('You are not authorized to edit this user.');
//       return;
//     }

//     const API_URL = `http://localhost:3000/api/v1/users/${userId}`;

//     axios
//       .put(API_URL, {
//         username: editedUser.username,
//         email: editedUser.email,
//         // Send other user fields as needed
//       })
//       .then(() => {
//         // Redirect to the users page on success using navigate
//         navigate('/users');
//       })
//       .catch(() => {
//         setError('Error updating user');
//       });
//   };

//   return (
//     <div>
//       <h2>Edit User</h2>
//       {error && (
//         <Alert variant="danger">
//           {error}
//           <CloseButton onClick={handleCloseError} />
//         </Alert>
//       )}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             name="username"
//             value={editedUser.username}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={editedUser.email}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         {/* Add other form fields for user data here as needed */}
//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default UserEditForm;
