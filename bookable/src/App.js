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
import Footer from "./components/footer";
import Login from "./components/login";
import Signup from "./components/signup";

import UserProfile from "./pages/userprofile";
import UserEditForm from "./pages/usereditform";
import UserFriends from "./pages/userfriends";

import NewArticleForm from "./pages/newarticleform";
import NewCategoryForm from "./pages/newcategoryform";
import ArticleProfile from "./pages/articleprofile";
import ArticleEditForm from "./pages/articleeditform";


import CategoryProfile from  "./pages/categoryprofile";
import CategoryEditForm from "./pages/categoryeditform";
import Message from "./pages/message";

import ConfirmationPage from "./pages/confirmationpage";


function App() {
    return (
      <BrowserRouter>
       <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />

          <Route path="/users/confirmation/:confirmation_token" Component={ConfirmationPage} />

          <Route path="/users" Component={Users} />
          <Route path="/users/:id" Component={UserProfile} />
          <Route path="/users/:id/friends" Component={UserFriends} />
          <Route path="/users/:userId/edit" Component={UserEditForm} />
          <Route path='/users/:userId/friends/message/:friendId' Component={Message} />
 
          <Route path="/categories" Component={Categories} />
          <Route path="/categories/:id" Component={CategoryProfile} />
          <Route path="/categories/new" Component={NewCategoryForm} />
          <Route path="/categories/:categoryId/edit" Component={CategoryEditForm} />
          
          
          <Route path="/articles"  Component={Articles} />
          <Route path="/articles/new"  Component={NewArticleForm} />
          <Route path="/articles/:id" element={<ArticleProfile />} />
          <Route path="/articles/:articleId/edit" Component={ArticleEditForm} />

          
        </Routes>
       <Footer />
      </BrowserRouter>
    );
  }

export default App;