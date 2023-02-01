/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/post/postSlice";


export const PostForm = () => {
  const { user } = useSelector(
    (state) => state.auth
  );
    const [formData, setFormData] = useState({
      title: "",
      caption: "",
      file: {},
      user: user
    });
    const navigate = useNavigate()
    const { title, caption } = formData;
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("api/posts/createPost", formData)
        .then((res) => console.log(res.response.data))
        .catch((err) => console.log(err));
      navigate("/feed");
    };
    const handleChange = (e) => {
      if (e.target.name === "file") {
        handleChangeFile(e);
        return;
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
    };

    const handleChangeFile = (e) => {
      const { name } = e.target;
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    };
    return (
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={title}
              name="title"
              id="title"
              onChange={handleChange}
              placeholder="Enter a title"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={caption}
              name="caption"
              id="caption"
              onChange={handleChange}
              placeholder="Enter a caption"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              name="file"
              id="file"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    );
  };