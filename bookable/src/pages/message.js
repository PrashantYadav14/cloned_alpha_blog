import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button, Dropdown, Modal } from 'react-bootstrap';
import './message.css';
import ActionCable from 'actioncable'
function Message() {
  const [focusCount, setFocusCount] = useState(0);
  const { userId, friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friendName, setFriendName] = useState('');
  const [messageToEdit, setMessageToEdit] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const messageContainerRef = useRef(null);
  const [emojiList, setEmojiList] = useState([
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊']);
    
    
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:3000/api/v1/users/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendName(response.data.username);
      })
      .catch((error) => {
        console.error('Error fetching friend information:', error);
      });

     

      axios.get(`http://localhost:3000/api/v1/users/${userId}/messages/${friendId}`, {
        params: {
          sender_id: userId,
          receiver_id: friendId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
    }
  }, [userId, friendId, focusCount]);

  useEffect(() => {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.post(`http://localhost:3000/api/v1/users/${userId}/messages`, {
        sender_id: userId,
        receiver_id: friendId,
        content: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
    }
  };  
  

  useEffect(() => {    
    if (storedUser.id) {
   
      const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  
      const subscription = cable.subscriptions.create(
        {
          channel: 'MessagesChannel',
          sender_id: storedUser.id,
          receiver_id: friendId
        },
        {
          received: (message) => {
           
            setMessages(prevMessages => {
              if (message.content === "read"){
                  return message.msg;
              }
              else{
                  if (message.content === 'deleted') {
                    return prevMessages.filter(m => m.id !== message.id);
                  }
                  const messageIndex = prevMessages.findIndex(m => m.id === message.id);
      
                  if (messageIndex !== -1) {
                    prevMessages[messageIndex] = message;
                    return [...prevMessages];
                  } else {
                    return [...prevMessages, message];
                  }
               }
            });
          }
          
        }
      );
  
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [storedUser.id, friendId]);




  const openEditModal = (message) => {
    setMessageToEdit(message);
    setEditedMessage(message.content);
  };

  const closeEditModal = () => {
    setMessageToEdit(null);
    setEditedMessage('');
  };

  const handleSaveEditedMessage = () => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.patch(`http://localhost:3000/api/v1/users/${userId}/messages/${messageToEdit.id}`, {
        content: editedMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessages(messages.map(message => 
          message.id === messageToEdit.id ? {...message, content: response.data.content} : message
        ));
        closeEditModal();
      })
      .catch((error) => {
        console.error('Error editing message:', error);
      });
    }
  };

  const handleDeleteMessage = (messageId) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.delete(`http://localhost:3000/api/v1/users/${userId}/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji);
  };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Container className="chat-container">

      <div className="friend-name">
        {friendName}
      </div>
    <Row>
        <Col>
            <div className="messages" ref={messageContainerRef}>
            {messages.map((message) => (
                <div key={message.id} className={message.sender_id === storedUser.id ? 'message sent' : 'message received'}>
                    <div className="message-content">
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>
                          {message.sender_id === storedUser.id ? 'You' : friendName}: {message.content}
                            {(message.sender_id === storedUser.id) && <Dropdown>
                                <Dropdown.Toggle variant="light"></Dropdown.Toggle>
                                  <Dropdown.Menu>
                                      <Dropdown.Item onClick={() => openEditModal(message)}>Edit</Dropdown.Item>
                                      <Dropdown.Item onClick={() => handleDeleteMessage(message.id)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>}
                        </p>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <small className="text-muted">{formatTimestamp(message.created_at)}</small>
                        {message.sender_id === storedUser.id && !message.read && <span className="tick-icon">✓</span>}
                        {message.sender_id === storedUser.id && message.read && <span className="tick-icon">✓✓</span>}
                      </div>
                    </div>
                </div>
            ))}
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
         <InputGroup>
          <Button variant="light" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</Button>
            <FormControl
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={() => {
                setFocusCount(prevCount => prevCount + 1);
              }}
              placeholder="Type a message..."
            />
            <Button variant="primary" onClick={handleSendMessage}>Send</Button>
          </InputGroup>
        </Col>
    </Row>
      
        {showEmojiPicker && (
        <div className="emoji-picker">
            {emojiList.map((emoji, index) => (
            <span key={index} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>
            ))}
        </div>
        )}
      <Modal show={!!messageToEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            placeholder="Edit your message..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEditedMessage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Message;


