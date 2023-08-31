
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, NavItem, Card} from 'react-bootstrap';

class Users extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://localhost:3000/api/v1/users").then((response) => {
      this.setState({
        users: response.data
      });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <Container>
         <Navbar bg="dark" variant="dark" style={{ marginTop: '20px'}}>
          <Navbar.Brand className="mx-auto " >Alpha Blog Users </Navbar.Brand>
        </Navbar>
        <div>
          {users.map((user, index) => (
            <Card key={index} className="my-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
              <Card.Body>
                <Card.Title className="mb-3" style={{ color: '#17a2b8', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{user.username}</Card.Title>
                <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>{user.email}</Card.Text>
                <Card.Title className="mb-4" style={{ color: '#17a2b8', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>Articles</Card.Title>

                {user.articles.map((article, index) => (
                  <article key={index} className="mb-3">
                    <Card.Title style={{ color: '#17a2b8', textAlign: 'center', fontSize: '1.2rem' }}>{article.title}</Card.Title>
                    <Card.Text style={{ color: '#343a40', textAlign: 'center' }}>{article.description}</Card.Text>
                  </article>
                ))}

                <hr />
              </Card.Body>
            </Card>
          ))}
        </div>

      </Container>
    );
  }

}

export default Users;

