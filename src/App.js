import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Blogs from "./components/blogs";
import About from "./components/about";
import BlogForm from "./components/blogForm";
import NotFound from "./common/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import ProtectedRoute from './common/protectedRoute';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);  

  return (
    <React.Fragment>
      <Navbar user={user} />
      <ToastContainer />
      <main role="main">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route 
            path="/blogs/:id" 
            element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blogs" 
            element={<Blogs user={user} />} 
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/about-us" element={<About />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
