import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './styling.css'; // Create a separate CSS file for styling

class Home extends Component {
  render() {
    return (
      <div id="page-content" className="home-container">
        <Container className="content-container">
          <h1 className="home-title">Hello!</h1>
          <h2 className="home-subtitle">Welcome to the WeBlog</h2>
          <hr className="divider" />
          <p className="home-description">Express Your Thoughts Here</p>
          <div className="text-center">
            <Button
              as={Link}
              to="/signup"
              variant="primary"
              className="signup-button"
            >
              Sign Up
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;


// import React, { Component } from 'react';
// import axios from 'axios';
// import './styling.css';
// import {Link} from 'react-router-dom';
// import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// class Home extends Component {
//   render() {
//     return (
//         <div id="page-content" style={{ justifyContent: 'center'}}>
//           <h1 style={{ textAlign: 'center', fontSize: '150px' }}>Hello!</h1>
//           <h2 style={{ textAlign: 'center' }}>Welcome to the alpha blog</h2>
//           <hr />
//           <p style={{ textAlign: 'center' }}>Express Your Thoughts Here</p>
        
//           <div className="text-center">
//               <Button as={Link} to="/signup" variant="primary" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} >
//             Sign Up
//               </Button>
//           </div>
//         </div>
//     );
//   }
// }

// export default Home;