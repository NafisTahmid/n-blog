import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import blogs from "../blogs";
import Blog from "../components/Blog";
import axios from "axios";
function HomeScreen() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const response = await axios.get("/api/blogs/");
      console.log("Response: ", response);
      setBlogs(response.data);
    }
    getBlogs();
  }, []);
  return (
    <div>
      <Container className="py-5">
        <h1>Latest Blogs: </h1>
        <Row>
          {blogs.map((blog) => {
            return (
              <Col key={blog.id} sm={12} md={6} lg={4} xl={3}>
                <Blog blog={blog} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;
