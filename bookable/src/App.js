import './App.css';
import axios from 'axios';
import { Component } from 'react';
import{ useEffect } from "react";
import { useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Articles from "./pages/article";
import Categories from "./pages/category"
import Users from "./pages/user"
import Home from "./pages/home"
import Navigation from "./components/navigation";
import Login from "./components/login";
import Signup from "./components/signup"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route exact path="/users" Component={Users} />
          <Route exact path="/users/:id" Component={Users} />
          <Route path="/articles"  Component={Articles} />
          <Route path="/categories" Component={Categories} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;