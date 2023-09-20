import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Navbar, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function UserFriends() {
  const [friends, setFriends] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      axios.get(`http://localhost:3000/api/v1/users/${storedUser.id}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setFriends(response.data);
        })
        .catch((error) => {
          console.error('Error fetching friends:', error);
        });
    }
  };

  const handleDeleteClick = (friend) => {
    setShowConfirmationModal(true);
    setFriendToDelete(friend);
  };

  const confirmDelete = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const DELETE_FRIEND_URL = `http://localhost:3000/api/v1/users/${storedUser.id}/friendships/${friendToDelete.id}`;
    const token = localStorage.getItem('token');

    axios
      .delete(DELETE_FRIEND_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendToDelete.id));
        setShowConfirmationModal(false);
        setFriendToDelete(null);
      })
      .catch((error) => {
        console.error('Error deleting friend:', error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setFriendToDelete(null);
  };

  const handleMessageClick = (friend) => {
    navigate(`message/${friend.id}`);
  };

  return (
    <Container style={{ backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
       <Navbar style={{ backgroundColor: '#194019' ,marginBottom: '20px' }}>
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Friends 
        </Navbar.Brand>
      </Navbar>
      <div className="mt-4">
        {friends && friends.map((friend) => (
          <Card key={friend.id} className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {friend.username}
              </Card.Title>
              <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
                {friend.email}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={`/users/${friend.id}`}>
                  <Button variant="success" className="mx-2">View</Button>
                </Link>
                <Button variant="primary" className="mx-2" onClick={() => handleMessageClick(friend)}>Message</Button>
                <Button variant="danger" className="mx-2" onClick={() => handleDeleteClick(friend)}>Remove Friend</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this friend?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserFriends;
