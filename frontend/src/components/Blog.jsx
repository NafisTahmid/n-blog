import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Blog({ blog }) {
  return (
    <Card className="my-2 rounded">
      <Link to={`/blog/${blog.slug}`}>
        <Card.Img src={blog.blog_image} alt={blog.blog_title} />
      </Link>
      <Link to={`/blog/${blog.slug}`} className="text-decoration-none">
        <Card.Body>
          <Card.Title as="div">{blog.blog_title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default Blog;
