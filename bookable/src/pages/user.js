// import React, { Component } from 'react';
// import axios from 'axios';

// class Users extends Component {

//   state = {
//     users: []
//   };

//   componentDidMount() {
//     axios.get('http://localhost:3000/users.json').then((response) => {
//       this.setState({
//         users: response.data.users
//       });
//     });
//   }

//   render() {
//     const { users } = this.state;
//     return (
//       <div className='container'>
//         <h1 style={{ textAlign: "center" }}>Listing all Users</h1>
//             {
//               users.map((user) => {
//                 return (
//                   <ul>
//                     <div key={user.id}>
//                         <li> <h3 style={{color: 'green'}}>{user.username}</h3> </li>
//                         <li> <h3 style={{color: 'green'}}>{user.email}</h3> </li>
//                         <hr />
//                     </div>
//                   </ul>);
//               })
//             }
//       </div>
//     );
//   }
// }
// export default Users;
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, NavItem } from 'react-bootstrap';

class Users extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    axios.get('http://localhost:3000/users.json').then((response) => {
      this.setState({
        users: response.data
      });
    });
  }

  render() {
    const { users, } = this.state;
    return (
      <Container>
       <Navbar style={{ textAlign: 'center' }}>
          <h1>Alpha Blog Users</h1>
        </Navbar>
        <Nav>
          {users.map((user, index) => (
            <NavItem key={index}>
              <h4 style={{ color: 'green' , textAlign: 'center'}}>{user.username}</h4>
              <p style={{ color: 'green', textAlign: 'center' }}>{user.email}</p>
              <h2 style={{ color: 'green' , textAlign: 'center'}} >Articles</h2>
      
              {user.articles.map((article, index) => (
                  <article key={index}>
                    <h3 style={{ color: 'green', textAlign: 'center' }}>{article.title}</h3>
                    <p style={{ color: 'green', textAlign: 'center' }}>{article.description}</p>
                  </article>
                ))}
              < hr/>
            </NavItem>
          ))}
        </Nav>
      </Container>
    );
  }

}

export default Users;

