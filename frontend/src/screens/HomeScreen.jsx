import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Blog from "../components/Blog";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { blogListAction } from "../actions/blogActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const listBlog = useSelector((state) => state.blogList);
  const { blogs, error, loading } = listBlog;

  useEffect(() => {
    dispatch(blogListAction());
  }, [dispatch]);
  return (
    <div>
      <Container className="py-5">
        <h1>Latest Blogs: </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {blogs.map((blog) => {
              return (
                <Col key={blog.id} sm={12} md={6} lg={4} xl={3}>
                  <Blog blog={blog} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default HomeScreen;
