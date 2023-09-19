import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikesComponent from './likescomponent'; 
import CommentsComponent from './commentscomponent';
import { Container, Navbar, Card, Spinner, Alert, Row, Col, Collapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './articleprofile.css';

function ArticleProfile() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const API_URL = `http://localhost:3000/api/v1/articles/${id}`;

    axios
      .get(API_URL)
      .then(response => {
        setArticle(response.data);
        setLoading(false); 
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });

    const COMMENTS_URL = `http://localhost:3000/api/v1/articles/${id}/comments`;
    axios
      .get(COMMENTS_URL)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  return (
    <Container style={{ backgroundColor: '#f8f9fa', paddingTop: '20px' }}>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand className="mx-auto" style={{ color: '#17a2b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Article Profile
        </Navbar.Brand>
      </Navbar>
      {loading ? ( 
        <div className="text-center"><Spinner animation="border" variant="primary" /></div>
      ) : article ? (
        <Card className="mb-4 p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
          <Card.Body>
            <Card.Title className="mb-3" style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {article.title}
            </Card.Title>
          
            <Card className="border mt-3">
                <Card.Body>
                  {article.image_url && ( 
                    <div className="text-center mb-3">
                      <img 
                        src={`http://localhost:3000${article.image_url}`} 
                        alt="Article" 
                        style={{ maxWidth: '50%' }} 
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>

            <Card.Text className="mb-3" style={{ color: '#343a40', textAlign: 'center', fontSize: '1rem' }}>
              {article.description}
            </Card.Text>
            {token && ( 
              <Container className="d-flex flex-column align-items-center"> 
                <Row className="mb-4"> 
                  <LikesComponent article_id={id} />
                </Row>
                <Row className="mb-4">
                  <CommentsComponent article_id={id} />
                </Row>
                <Row className="mb-4">
                  <button
                    className="view-all-comments"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowComments(!showComments);
                    }}
                  >
                    View All Comments
                  </button>
                  <Collapse in={showComments}>
                    <div className="w-100">
                    {comments.length > 0 ? (
                      comments.map(comment => (
                        <Card key={comment.id} className="comment-card">
                          <Card.Body>
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-user">User: {comment.user.username}</div>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center">No comments yet</div>
                    )}
                    </div>
                  </Collapse>
                </Row>
              </Container>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger" className="mt-3">Article not found</Alert>
      )}
    </Container>
  );
}

export default ArticleProfile;
