import React, { Component } from 'react';
import { useState } from 'react';
import  axios from 'axios';
class Signup extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      username : "",
      email : "",
      password : ""
    }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
   }
  handleSubmit(event){

        axios.post("http://localhost:3000/api/v1/signup", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }).then(response => {
          console.log("signup response", response);
        }).catch(error => {
          console.log("signup error", error);
        });
   event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign up for Weblog</h1>
        <form onSubmit={this.handleSubmit} >
        <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
        />
        <br />
          <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            
          />
          <br />
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
           
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;


// import React, { Component } from 'react';
// import { useState } from 'react';
// import axios from 'axios';

// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       registrationErrors: "",
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     const { username, email, password } = this.state;

//     const data = {
//       username,
//       email,
//       password,
//     };

//     const headers = {
//       'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
//     };

//     axios.post("http://localhost:3000/api/v1/signup", data, headers)
//       .then((response) => {
//         console.log("signup  response", response);
//       })
//       .catch((error) => {
//         console.log("signup error", error);
//         this.setState({ registrationErrors: error.response.data.errors });
//       });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Sign up for Weblog</h1>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="username"
//             name="username"
//             placeholder="Username"
//             value={this.state.username}
//             onChange={this.handleChange}
//             required
//           />
//           <br />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={this.state.email}
//             onChange={this.handleChange}
//             required
//           />
//           <br />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             required
//           />
//           <br />
//           <button type="submit">Sign Up</button>
//         </form>
//         {this.state.registrationErrors && <div>{this.state.registrationErrors}</div>}
//       </div>
//     );
//   }
// }

// export default Signup;
