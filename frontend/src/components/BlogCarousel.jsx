import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTopBlogs } from "../actions/blogActions";
import Loader from "./Loader";
import Message from "./Message";
const BlogCarousel = () => {
  const dispatch = useDispatch();
  const topBlogs = useSelector((state) => state.blogTop);
  const { blogs, error, loading } = topBlogs;
  console.log("Blogs: ", blogs);

  useEffect(() => {
    dispatch(getTopBlogs());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Carousel className="bg-dark" hover="pause">
          {blogs.map((blog) => (
            <Carousel.Item>
              <Link key={blog.id} to={`/blog/${blog.slug}`}>
                <Image src={blog.blog_image} alt={blog.blog_title} />
                <Carousel.Caption>
                  <h6>{blog.blog_title}</h6>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BlogCarousel;
