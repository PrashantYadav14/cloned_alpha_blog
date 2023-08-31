import React, { Component } from 'react';
import axios from 'axios';
import { Container, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Categories extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/categories').then((response) => {
      this.setState({
        categories: response.data
      });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <Container style={{ backgroundColor: '#f8f9fa', paddingTop: '20px' }}>
        <Navbar bg="dark" variant="dark" style={{ marginBottom: '20px' }}>
          <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
            WeBlog Categories
          </Navbar.Brand>
        </Navbar>
        <div className="mt-4">
          {categories.map((category) => (
            <Card key={category.id} className="mb-4 p-3 border" style={{ backgroundColor: '#fff' }}>
              <Card.Body>
                <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  <Link to={`/categories/${category.id}`} style={{ textDecoration: 'underline', color: 'green' }}>
                    {category.name}
                  </Link>
                </Card.Title>
                <hr />
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    );
  }
}

export default Categories;
