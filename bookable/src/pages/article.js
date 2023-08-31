
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Navbar, Card } from 'react-bootstrap';

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    let mounted = true;
    const API_URL = "http://localhost:3000/api/v1/articles";
    axios.get(API_URL).then((response) => {
      if (mounted) {
        this.setState({
          articles: response.data
        });
      }
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <Container style={{ backgroundColor: '#f8f9fa', paddingTop: '20px' }}>
        <Navbar bg="dark" variant="dark" style={{ marginBottom: '20px' }}>
          <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Alpha Blog Articles
          </Navbar.Brand>
        </Navbar>
      <div className="mt-4">
        {articles.map((article) => (
          <Card key={article.id} className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {article.title}
              </Card.Title>
              <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
                {article.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
      // <Container>
      //   <Navbar bg="dark" variant="dark">
      //     <Navbar.Brand>Alpha Blog Articles</Navbar.Brand>
      //   </Navbar>
      //   <div className="mt-4">
      //     {articles.map((article) => (
      //       <Card key={article.id} className="mb-3">
      //         <Card.Body>
      //           <Card.Title style={{ color: 'green' }}>{article.title}</Card.Title>
      //           <Card.Text>{article.description}</Card.Text>
      //         </Card.Body>
      //       </Card>
      //     ))}
      //   </div>
      // </Container>
    );
  }
}

export default Articles;


