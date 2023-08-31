import './App.css';
import axios from 'axios';
import { Component } from 'react';
import{ useEffect } from "react";
import { useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Articles from "./pages/article";
import Categories from "./pages/category";
import Users from "./pages/user";
import Home from "./pages/home";
import Navigation from "./components/navigation";
import Login from "./components/login";
import Signup from "./components/signup";
import UserProfile from "./pages/userprofile";
import CategoryProfile from  "./pages/categoryprofile";
import NewArticleForm from "./pages/newarticleform"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/users" Component={Users} />
          <Route path="/users/:id" Component={UserProfile} />
          <Route path="/articles"  Component={Articles} />
          <Route path="/categories" Component={Categories} />
          <Route path="/categories/:id" Component={CategoryProfile} />
          <Route path="/articles/new"    Component={NewArticleForm} />
          
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;