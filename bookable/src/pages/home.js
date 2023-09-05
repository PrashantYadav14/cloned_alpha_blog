import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './styling.css'; 
class Home extends Component {
  render() {
    const token = localStorage.getItem('token'); 
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div id="page-content" className="home-container">
        <Container className="content-container">
          <h1 className="home-title">Hello!</h1>
          <h2 className="home-subtitle">Welcome to the WeBlog</h2>
          <hr className="divider" />
          <p className="home-description">Express Your Thoughts Here</p>
          <div className="text-center">

            {!token ? (
              <Button
                as={Link}
                to="/signup"
                variant="primary"
                className="signup-button"
              >
                Sign Up
              </Button>
            ) : (
              <p className="home-description">You are logged in. Explore more!</p>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;

