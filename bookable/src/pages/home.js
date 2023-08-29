
import React, { Component } from 'react';
import axios from 'axios';
import './styling.css';
import {Link} from 'react-router-dom';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div id="page-content" style={{ justifyContent: 'center'}}>
          <h1 style={{ textAlign: 'center', fontSize: '150px' }}>Hello!</h1>
          <h2 style={{ textAlign: 'center' }}>Welcome to the alpha blog</h2>
          <hr />
          <p style={{ textAlign: 'center' }}>Express Your Thoughts Here</p>
        
          <div className="text-center">
              <Button as={Link} to="/signup" variant="primary" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} >
            Sign Up
              </Button>
          </div>
        </div>
    );
  }
}

export default Home;