import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { blogDetailsAction, blogUpdateAction } from "../actions/blogActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";

const UpdateBlogScreen = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const dispatch = useDispatch();
  const detailsBlog = useSelector((state) => state.blogDetails);
  const { blog, error, loading } = detailsBlog;
  const userLogin = useSelector((state) => state.userLogin);
  const updateBlog = useSelector((state) => state.blogUpdate);
  const {
    updatedBlog,
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = updateBlog;
  const { userInfo } = userLogin;
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(blogDetailsAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (blog && blog.slug === slug) {
      setBlogTitle(blog.blog_title || "");
      setBlogSlug(blog.slug || "");
      setBlogContent(blog.blog_content || "");
      setBlogImage(blog.blog_image || "");
    }
  }, [blog, slug]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: BLOG_UPDATE_RESET,
      });
      navigate("/admin/blogs");
    }
  }, [successUpdate, dispatch, slug]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      blogUpdateAction(slug, {
        slug: blogSlug,
        blogTitle,
        blogContent,
        blogImage,
        blogSlug,
      }),
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("blogImage", file);
      formData.append("blogSlug", slug);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put("/api/blogs/upload/", formData, config);
      setBlogImage(data.blog_image);
    } catch (error) {
      setUploadError(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message,
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error || errorUpdate ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Update Blog:</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="blog_title">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog_title">
              <Form.Label>Blog Slug</Form.Label>
              <Form.Control
                type="text"
                value={blogSlug}
                onChange={(e) => setBlogSlug(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog_content">
              <Form.Label>Blog Content</Form.Label>
              <Form.Control
                type="text"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group controlId="blog_image">
              <Form.Label>Blog Image</Form.Label>
              <Form.Control
                type="text"
                value={blogImage}
                onChange={(e) => setBlogImage(e.target.value)}
              />
              <Form.Label>Choose File</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                disabled={uploading}
              />
              {uploading && <p>Uploading image...</p>}
              {uploadError && <Message variant="danger">{uploadError}</Message>}
            </Form.Group>
            <Button type="submit" className="my-2" disabled={uploading}>
              Update Blog
            </Button>
          </Form>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        </FormContainer>
      )}
    </div>
  );
};

export default UpdateBlogScreen;
