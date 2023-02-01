import axios from "axios";
import React, { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = axios.get('/feed');
      const posts = await (await res).data.posts;
      setPosts(posts);
    };
    getPosts();
  }, []);
  console.log(posts)
  return (
    <div>{posts ? posts.map((f) =><a style={{display: "block"}} href={`posts/${f._id}`} key={f._id}>{f.title}</a>) : ""}</div>
  );

}

export default Feed;
