import React, { Component } from 'react';
import { useState } from 'react';
class Signup extends Component {

  render() {
    return (
      <div>
        <h1>Sign up for Weblog</h1>
        <form onSubmit={this.handleSubmit}>
        <input
            type="username"
            placeholder="Username"
            
        />
        <br />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
