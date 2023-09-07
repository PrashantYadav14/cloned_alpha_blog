import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Navbar, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function Categories() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories').then((response) => {
      setCategories(response.data);
    });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  
  const handleViewCategory = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <Container style={{  backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
      <Navbar style={{ backgroundColor: '#194019' , marginBottom: '20px' }}>
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          WeBlog Categories
        </Navbar.Brand>
      </Navbar>
      <div className="mt-4">
        {categories.map((category) => (
          <Card key={category.id} className="mb-4 p-3 border" style={{ backgroundColor: '#fff' }}>
            <Card.Body>
              <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {category.name}
              </Card.Title>
              {user && user.admin ? ( 
                <div className="d-flex justify-content-center">
                  <div className="mx-2"> 
                    <Button variant="primary" onClick={() => navigate(`/categories/${category.id}/edit`)}>
                      Edit
                    </Button>
                  </div>
                  <div className="mx-2"> 
                    <Button variant="success" onClick={() => handleViewCategory(category.id)}>
                      View
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="mx-2"> 
                    <Button variant="success" onClick={() => handleViewCategory(category.id)}>
                      View
                    </Button>
                  </div>
                </div>
              )}
              <hr />
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Categories;





