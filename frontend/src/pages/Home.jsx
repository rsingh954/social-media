import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
function Home() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFeedClick = () => {
    navigate("/");
  };

  return auth.user ? (
    <div>
      <Link to="/new-post" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Post
      </Link>
      <Link to="/feed" className="btn btn-reverse btn-block">
        Go To Feed
      </Link>
    </div>
  ) : (
    <p>Login</p>
  );
}

export default Home;
