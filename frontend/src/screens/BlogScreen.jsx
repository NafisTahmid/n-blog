import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function BlogScreen() {
  const [blog, setBlog] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    async function getBlog() {
      const response = await axios.get(`/api/blogs/${slug}/`);
      setBlog(response.data);
    }
    getBlog();
  }, [slug]);

  console.log("Blog: ", blog);
  return (
    <div>
      <Container>
        <Row className="justify-content-center align-items-center my-3">
          <Col>
            <h2 className="text-center mt-3">{blog.blog_title}</h2>
            <Image
              className="img-fluid mx-auto d-block my-3"
              src={blog.blog_image}
              alt={blog.blog_title}
            />

            <p className="text-center">{blog.blog_content}</p>
          </Col>

          <Row className="justify-content-center align-items-center">
            <Col md={6} sm={12} lg={6} xl={6}>
              <Form noValidate>
                <Form.Group as={Col} className="" controlId="commentText">
                  <Form.Label>Your Comment</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    placeholder="Write your comment..."
                    style={{ resize: "vertical" }}
                  />
                </Form.Group>
                <Button className="mx-auto mt-2" variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={6} sm={12} lg={6} xl={6}>
              <h3>Other comments:</h3>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default BlogScreen;
