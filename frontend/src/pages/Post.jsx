import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Post() {
  const [post, setPost] = useState({
    _id: null,
    title: "",
    image: "",
    caption: "",
    likes: 0,
  });
  const { user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    let flag = true;
    const url = window.location.pathname;
    console.log(url)
    axios.get(`http://localhost:5000/api${url}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then((res) => {
      if (flag) {
        console.log(res.data.post)

        setPost(res.data.post);
      }
    });
    return () => (flag = false);
  }, []);
  const { _id, title, image, caption, likes } = post;
  const handleLike = () => {};
  const handleReturn = () => {
    navigate("/feed");
  };

  return (
    <main>
        <span> Author: {user.userName ? user.userName  : "" }</span>
      <section>
        <h1>{title}</h1>
        <img src={image} alt="content" />
        <p>{caption}</p>
        <p>{likes}</p>
      </section>
      <button onClick={handleReturn} className="btn">
        <FaArrowLeft /> Return to Feed
      </button>
      <button onClick={handleLike} className="btn">
        <FaHeart /> Like
      </button>
    </main>
  );
}

export default Post;
