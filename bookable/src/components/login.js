import React, { Component } from 'react';
import { useState } from 'react';
//import User from '../../models/User';

class Login extends Component {

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            
          />
          <br />
          <input
            type="password"
            placeholder="Password"
           
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
