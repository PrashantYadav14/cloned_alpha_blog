import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Card, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [friendRequestAccepted, setFriendRequestAccepted] = useState(null);
  const navigate = useNavigate();

  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [userFriendships, setUserFriendships] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
    fetchUserFriendships();
  }, []);

  const fetchFriendRequests = () => {
    const userId = storedUser ? storedUser.id : null; 
    if (userId) {
      axios.get(`http://localhost:3000/api/v1/users/${userId}/friend_requests`)
        .then((response) => {
          setSentFriendRequests(response.data);
        })
        .catch((error) => {
          console.error('Error fetching friend requests:', error);
        });
    }
  };

  const fetchUserFriendships = () => {
    const userId = storedUser ? storedUser.id : null;
    if (userId) {
      axios.get(`http://localhost:3000/api/v1/users/${userId}/friendships`)
        .then((response) => {
          setUserFriendships(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user friendships:', error);
        });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/api/v1/users").then((response) => {
      setUsers(response.data);
    });
  };

  const handleDeleteClick = (user) => {
    setShowConfirmationModal(true);
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    const DELETE_USER_URL = `http://localhost:3000/api/v1/users/${userToDelete.id}`;
    const token = localStorage.getItem('token');

    axios
      .delete(DELETE_USER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
        setShowConfirmationModal(false);
        setUserToDelete(null);

        if (userToDelete.id !== storedUser.id && storedUser.admin) {
          navigate('/users');
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setUserToDelete(null);
  };

  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  const acceptFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/v1/users/${requestId}/friendships`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setFriendRequestAccepted(true);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };
  
  const sendFriendRequest = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/v1/users/${friendId}/friend_requests`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const deleteFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/users/${storedUser.id}/friend_requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSentFriendRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error deleting friend request:', error);
    }
  };
  
  const removeFriend = async (friendshipId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/users/${storedUser.id}/friendships/${friendshipId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserFriendships(prevFriendships => prevFriendships.filter(friendship => friendship.id !== friendshipId));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };
  

  return (
    <Container style={{ backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
      <Navbar style={{ backgroundColor: '#194019' ,marginBottom: '20px' }}>
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Alpha Blog Users
        </Navbar.Brand>
      </Navbar>
      <div className="mt-4">
        {users && users.map((user) => (
          <Card key={user.id} className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {user.username}
              </Card.Title>
              <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
                {user.email}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={`/users/${user.id}`}>
                  <Button variant="success" className="mx-2">View</Button>
                </Link>
                {(storedUser && user.id === storedUser.id) ? (
                  <Link to={`/users/${user.id}/edit`}>
                    <Button variant="primary" className="mx-2">Edit</Button>
                  </Link>
                ) : null}
                {(storedUser && (user.id === storedUser.id || storedUser.admin)) ? (
                  <Button variant="danger" className="mx-2" onClick={() => handleDeleteClick(user)}>Delete</Button>
                ) : null}
              </div>

             <div className="d-flex justify-content-center mt-2">
              {storedUser && storedUser.id !== user.id && (
                <>
                {userFriendships.some(friendship => friendship.friend_id === user.id) ? (
                    <Button variant="danger" className="mx-2" onClick={() => {
                      const friendship = userFriendships.find(friendship => friendship.friend_id === user.id);
                      if (friendship) {
                        removeFriend(friendship.id);
                      }
                    }} >Remove Friend</Button>
                  ) : (
                    <>
                  {sentFriendRequests.some(request => (request.receiver_id === user.id && request.sender_id === storedUser.id)) ? (
                    <Button variant="success" className="mx-2" disabled>Friend Request Sent</Button>
                  ) : (
                    <>
                      {sentFriendRequests.some(request => request.sender_id ===user.id && request.receiver_id === storedUser.id ) ? (
                        <Button variant="info" className="mx-2" onClick={() => acceptFriendRequest(user.id)}>Accept Request</Button>
                      ) : (
                        <Button variant="info" className="mx-2" onClick={() => sendFriendRequest(user.id)}>Add Friend</Button>
                      )}
                    </>
                  )}
                
                  {sentFriendRequests.map((request) => (
                    request.sender_id === user.id  && request.receiver_id === storedUser.id && (
                      <Button 
                        key={request.id}
                        variant="warning" 
                        className="mx-2" 
                        onClick={() => deleteFriendRequest(request.id)}
                      >
                        Decline Friend Request
                      </Button>
                    )
                  ))}
                   {sentFriendRequests.map((request) => (
                    request.receiver_id === user.id && request.sender_id === storedUser.id && (
                      <Button 
                        key={request.id}
                        variant="warning" 
                        className="mx-2" 
                        onClick={() => deleteFriendRequest(request.id)}
                      >
                        Delete Friend Request
                      </Button>
                    )
                  ))}
                   </>)}
                </>
              )}
            </div> 
           
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user and all associated articles?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Users;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Navbar, Card, Button, Modal } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [friendRequestAccepted, setFriendRequestAccepted] = useState(null);
//   const navigate = useNavigate();

//   const [sentFriendRequests, setSentFriendRequests] = useState([]);

//   useEffect(() => {
//     fetchFriendRequests();
//   }, []);

//   const fetchFriendRequests = () => {
//     const userId = storedUser ? storedUser.id : null; 
//     if (userId) {
//     axios.get(`http://localhost:3000/api/v1/users/${userId}/friend_requests`)
//       .then((response) => {
//         setSentFriendRequests(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching friend requests:', error);
//       });
//   }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios.get("http://localhost:3000/api/v1/users").then((response) => {
//       setUsers(response.data);
//     });
//   };

//   const handleDeleteClick = (user) => {
//     setShowConfirmationModal(true);
//     setUserToDelete(user);
//   };

//   const confirmDelete = () => {
//     const DELETE_USER_URL = `http://localhost:3000/api/v1/users/${userToDelete.id}`;
//     const token = localStorage.getItem('token');

//     axios
//       .delete(DELETE_USER_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
//         setShowConfirmationModal(false);
//         setUserToDelete(null);

//         if (userToDelete.id !== storedUser.id && storedUser.admin) {
//           navigate('/users');
//         } else {
//           localStorage.removeItem('user');
//           localStorage.removeItem('token');
//           navigate('/');
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting user:', error);
//       });
//   };

//   const cancelDelete = () => {
//     setShowConfirmationModal(false);
//     setUserToDelete(null);
//   };

//   const storedUser = JSON.parse(localStorage.getItem('user'));
  
//   const acceptFriendRequest = async (requestId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`http://localhost:3000/api/v1/users/${requestId}/friendships`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       setFriendRequestAccepted(true);
//       fetchFriendRequests();
//     } catch (error) {
//       console.error('Error accepting friend request:', error);
//     }
//   };
  
//   const sendFriendRequest = async (friendId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`http://localhost:3000/api/v1/users/${friendId}/friend_requests`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
    
//     } catch (error) {
//       console.error('Error sending friend request:', error);
//     }
//   };

//   const removeFriend = async (friendId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`/api/v1/users/${friendId}/remove_friend`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//     } catch (error) {
//       console.error('Error removing friend:', error);
//     }
//   };

//   return (
//     <Container style={{ backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
//       <Navbar style={{ backgroundColor: '#194019' ,marginBottom: '20px' }}>
//         <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
//           Alpha Blog Users
//         </Navbar.Brand>
//       </Navbar>
//       <div className="mt-4">
//         {users && users.map((user) => (
//           <Card key={user.id} className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
//             <Card.Body>
//               <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
//                 {user.username}
//               </Card.Title>
//               <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
//                 {user.email}
//               </Card.Text>
//               <div className="d-flex justify-content-center">
//                 <Link to={`/users/${user.id}`}>
//                   <Button variant="success" className="mx-2">View</Button>
//                 </Link>
//                 {(storedUser && user.id === storedUser.id) ? (
//                   <Link to={`/users/${user.id}/edit`}>
//                     <Button variant="primary" className="mx-2">Edit</Button>
//                   </Link>
//                 ) : null}
//                 {(storedUser && (user.id === storedUser.id || storedUser.admin)) ? (
//                   <Button variant="danger" className="mx-2" onClick={() => handleDeleteClick(user)}>Delete</Button>
//                 ) : null}
//               </div>

//             <div className="d-flex justify-content-center mt-2">
//               {storedUser && storedUser.id !== user.id && (
//                 <>
//                   {sentFriendRequests.some(request => (request.receiver_id === user.id && request.sender_id === storedUser.id)) ? (
//                     <Button variant="success" className="mx-2" disabled>Friend Request Sent</Button>
//                   ) : (
//                     <>
//                       {sentFriendRequests.some(request => request.sender_id ===user.id && request.receiver_id === storedUser.id ) ? (
//                         <Button variant="info" className="mx-2" onClick={() => acceptFriendRequest(user.id)}>Accept Request</Button>
//                       ) : (
//                         <Button variant="info" className="mx-2" onClick={() => sendFriendRequest(user.id)}>Add Friend</Button>
//                       )}
//                     </>
//                   )}
//                   {sentFriendRequests.some(request => request.sender_id === user.id  && request.receiver_id === storedUser.id) && (
//                     <Button variant="warning" className="mx-2" onClick={() => removeFriend(user.id)}>Decline Friend Request</Button>
//                   )}
//                    {sentFriendRequests.some(request => request.receiver_id === user.id && request.sender_id === storedUser.id) && (
//                     <Button variant="warning" className="mx-2" onClick={() => removeFriend(user.id)}>Delete Friend Request</Button>
//                    )}
//                 </>
//               )}
//             </div>
           
//             </Card.Body>
//           </Card>
//         ))}
//       </div>

//       <Modal show={showConfirmationModal} onHide={cancelDelete}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this user and all associated articles?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cancelDelete}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Yes, Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default Users;

