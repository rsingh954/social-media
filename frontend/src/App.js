/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import { PostForm } from "./pages/PostForm";
import Register from "./pages/Register";

function App() {
  return (
    <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-post" element={<PostForm />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="posts/:id" element={<Post />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer/>
    </>
  );
}

export default App;
