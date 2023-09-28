import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

function Navigation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState(null); 

  
  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand" style={{ marginLeft: '20px', fontWeight: 'bold' }}>
        WeBlog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ml-auto" navbarScroll>
          <Nav.Link as={Link} to="/users" className="nav-link">
            Bloggers
          </Nav.Link>
          
          {token && (<Nav.Link as={Link} to={`users/${user.id}/friends`} className="nav-link">
            Friends
          </Nav.Link>
          )}
          <NavDropdown title="Articles" id="navbarScrollingDropdown" className="nav-dropdown">
            {token && (
              <NavDropdown.Item as={Link} to="/articles/new" className="dropdown-item create-article-link">
                <span className="create-icon"></span> Create new article
              </NavDropdown.Item>
            )}
            <NavDropdown.Item as={Link} to="/articles" className="dropdown-item">
              View Article
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Categories" id="navbarScrollingDropdown" className="nav-dropdown">
            {token && user && user.admin && (
              <NavDropdown.Item as={Link} to="/categories/new" className="dropdown-item create-category-link">
                <span className="create-icon"></span> Create new categories
              </NavDropdown.Item>
            )}
            <NavDropdown.Item as={Link} to="/categories" className="dropdown-item">
              View category
            </NavDropdown.Item>
          </NavDropdown>

          {token ? (
            <>
              <Nav.Link as={Link} to={`/users/${user.id}`} className="nav-link">
                {user.username}'s Profile
              </Nav.Link>
              {user.admin && (
                <Nav.Link>(Admin)</Nav.Link>
              )}
            </>
          ) : null}

          {token ? null : (
            <Nav.Link as={Link} to="/login" className="nav-link">
              Log in
            </Nav.Link>
          )}

          {token ? (
            <Nav.Link onClick={handleLogout} className="nav-link">
              Log Out
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;





