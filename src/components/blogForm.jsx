import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from 'react-toastify';
import { getTypes } from "../services/typeService";
import { getBlog, saveBlog } from "../services/blogService";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../common/form"; // Assuming Form component is correctly implemented

const BlogForm = () => {
  const [types, setTypes] = useState([]);
  const [data, setData] = useState({
    title: "",
    typeId: "",
    content: "",
    author: ""
  });
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    typeId: Joi.string().required().label("Type"),
    content: Joi.string().min(5).max(255).required().label("Content"),
    author: Joi.string().min(5).max(50).required().label("Author")
  };

  const { id: blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function populateTypes() {
      const { data: types } = await getTypes();
      setTypes(types);
    }

    async function populateBlog() {
      try {
        if (blogId === "new") return;
        const { data: blog } = await getBlog(blogId);
        setData(mapToViewModel(blog));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/not-found");
        }
      }
    }

    populateTypes();
    populateBlog();
  }, [blogId, navigate]);

  const mapToViewModel = (blog) => {
    return {
      _id: blog._id,
      title: blog.title,
      typeId: blog.type._id,
      content: blog.content,
      author: blog.author
    };
  };

  const doSubmit = async () => {
    try {
      await saveBlog(data);
      navigate("/blogs");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorsCopy = { ...errors };
        setErrors(errorsCopy);
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div class="mb-3" style={{ marginTop: "150px", display: 'flex', justifyContent:'center', alignItems:'center' }}>
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Blog Form</h4>
            <Form schema={schema} doSubmit={doSubmit} setData={setData} data={data}>
                {({ renderInput, renderListBox, renderButton }) => (
                  <form onSubmit={doSubmit}>
                    {renderInput("title", "Title")}
                    {renderListBox("typeId", "Blog Types", types)}
                    {renderInput("content", "Content")}
                    {renderInput("author", "Author")}
                    {renderButton("Save")}
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BlogForm;
