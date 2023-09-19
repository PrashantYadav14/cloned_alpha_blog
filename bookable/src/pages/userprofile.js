import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Alert, Navbar, Button, Modal } from 'react-bootstrap';
import './image.css'; 

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleDeleteClick = (article) => {
    setShowConfirmationModal(true);
    setArticleToDelete(article);
  };

  const confirmDelete = () => {
    const DELETE_URL = `http://localhost:3000/api/v1/articles/${articleToDelete.id}`;
    const token = localStorage.getItem('token');

    axios
      .delete(DELETE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const updatedArticles = userData.articles.filter(article => article.id !== articleToDelete.id);
        setUserData({ ...userData, articles: updatedArticles });
        setShowConfirmationModal(false);
        setArticleToDelete(null);
      })
      .catch((error) => {
        console.error('Error deleting article:', error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setArticleToDelete(null);
  };

  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  return (
    <Container style={{ backgroundColor: 'rgba(0, 128, 0, 0)', paddingTop: '20px' }}>
      <div className="mt-4">
        {userData ? (
          <Card className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <Card.Title className="mb-3 text-center" style={{ color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {userData.username}
              </Card.Title>
              <Card.Text className="mb-3 text-center" style={{ color: '#343a40', fontSize: '1rem' }}>
                Email: {userData.email}
              </Card.Text>
              <div className="d-flex justify-content-center">
                {localStorage.getItem('token') && storedUser && (
                  <div>
                    {(storedUser.id === parseInt(id)) && (
                      <Link to={`/users/${id}/edit`}>
                        <Button variant="primary" className="mx-2">Edit Profile</Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Alert variant="danger" className="mt-3">User Data not found</Alert>
        )}

        {userData && userData.articles && userData.articles.length > 0 && (
          <>
          <Navbar style={{ backgroundColor: '#39AD48'  ,marginBottom: '20px' }}>
            <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Articles Created by {userData.username}
            </Navbar.Brand>
         </Navbar>
           
            {userData.articles.map(article => (
              <Card key={article.id} className="mb-3 border border-success">
                <Card.Body>
                  <h5 className="text-article-title text-center">{article.title}</h5>
                  <div className="d-flex justify-content-center">
                    <Link to={`/articles/${article.id}`}>
                      <Button variant="success" className="mx-2">View</Button>
                    </Link>
                    {localStorage.getItem('token') && storedUser && (
                      <div>
                        {(storedUser.id === article.user_id ) && (
                          <>
                            <Link to={`/articles/${article.id}/edit`}>
                              <Button variant="primary" className="mx-2">Edit</Button>
                            </Link>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => handleDeleteClick(article)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </div>

      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
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

export default UserProfile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Card, Alert, Button, Modal } from 'react-bootstrap';
// import './image.css'; 

// function UserProfile() {
//   const { id } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [articleToDelete, setArticleToDelete] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/api/v1/users/${id}`)
//       .then(response => {
//         setUserData(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, [id]);

//   const handleDeleteClick = (article) => {
//     setShowConfirmationModal(true);
//     setArticleToDelete(article);
//   };

//   const confirmDelete = () => {
//     const DELETE_URL = `http://localhost:3000/api/v1/articles/${articleToDelete.id}`;
//     const token = localStorage.getItem('token');

//     axios
//       .delete(DELETE_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         const updatedArticles = userData.articles.filter(article => article.id !== articleToDelete.id);
//         setUserData({ ...userData, articles: updatedArticles });
//         setShowConfirmationModal(false);
//         setArticleToDelete(null);
//       })
//       .catch((error) => {
//         console.error('Error deleting article:', error);
//       });
//   };

//   const cancelDelete = () => {
//     setShowConfirmationModal(false);
//     setArticleToDelete(null);
//   };

//   const storedUser = JSON.parse(localStorage.getItem('user'));
  
//   return (
//     <div className="user-profile-bg">
//       <Container className="mt-5 user-profile-container">
//         <h2 className="mb-4 text-center text-primary">User Profile</h2>
//         {userData ? (
//           <>
//             <Card className="mb-4 border border-info">
//               <Card.Body>
//                 <Card.Title className="text-primary">Profile Information</Card.Title>
//                 <Card.Text>
//                   <strong className="text-info">Name:</strong> {userData.username}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong className="text-info">Email:</strong> {userData.email}
//                 </Card.Text>
//               </Card.Body>
//             </Card>

//             {userData.articles && userData.articles.length > 0 && (
//               <>
//                 <h3 className="text-center text-success">Articles Created by {userData.username}</h3>
//                 {userData.articles.map(article => (
//                   <Card key={article.id} className="mb-3 border border-success">
//                     <Card.Body>
//                       <h5 className="text-article-title">{article.title}</h5>
//                       <div className="d-flex justify-content-center">
//                         <Link to={`/articles/${article.id}`}>
//                           <Button variant="success" className="mx-2">View</Button>
//                         </Link>
//                         {localStorage.getItem('token') && storedUser && (
//                             <div>
//                               {(storedUser.id === article.user_id ) && (
//                                 <>
//                                   <Link to={`/articles/${article.id}/edit`}>
//                                     <Button variant="primary" className="mx-2">Edit</Button>
//                                   </Link>
//                                   <Button
//                                     variant="danger"
//                                     className="mx-2"
//                                     onClick={() => handleDeleteClick(article)}
//                                   >
//                                     Delete
//                                   </Button>
//                                 </>
//                               )}
//                               {/* {storedUser.admin && (
//                                 <Button
//                                   variant="danger"
//                                   className="mx-2"
//                                   onClick={() => handleDeleteClick(article)}
//                                 >
//                                   Delete
//                                 </Button>
//                               )} */}
//                             </div>
//                           )}

//                       </div>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </>
//             )}
//           </>
//         ) : (
//           <Alert variant="danger" className="mt-3">User Data not found</Alert>
//         )}
//       </Container>

//       <Modal show={showConfirmationModal} onHide={cancelDelete}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cancelDelete}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Yes, Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default UserProfile;
