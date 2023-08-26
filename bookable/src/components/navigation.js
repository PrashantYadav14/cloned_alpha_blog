
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Navigation extends Component {
     render (){
        return (
            <Navbar expand="lg" className="bg-black" >
          <Container fluid>
            <Navbar.Brand as={Link} to="/">WeBlog</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                  <Nav.Link as={Link} to="/users" style={{ color: "black" }}>Bloggers</Nav.Link>
            
                <NavDropdown title="Articles" id="navbarScrollingDropdown" style={{ color: 'white' }}> 
                  <NavDropdown.Item href="#action3" >Create new article</NavDropdown.Item>
                  <NavDropdown.Item  as={Link} to="/articles"  >View Article</NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item> */}
                </NavDropdown>

                <NavDropdown title="Categories" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Create new categories</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categories">View category</NavDropdown.Item>
    
                </NavDropdown>
                <Nav.Link as={Link} to="/login" style={{ color: "black" }}>Log in</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
         </Navbar>
        );
     }
}
export default Navigation;