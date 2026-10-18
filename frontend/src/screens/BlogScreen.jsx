import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { blogDetailsAction, postComment } from "../actions/blogActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useLocation } from "react-router-dom";
import { BLOG_COMMENT_RESET } from "../constants/blogConstants";
function BlogScreen() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const detailsBlog = useSelector((state) => state.blogDetails);
  const { blog, error, loading } = detailsBlog;
  const loginUser = useSelector((state) => state.userLogin);
  const { userInfo } = loginUser;
  const commentBlogPost = useSelector((state) => state.postBlogComment);
  const {
    error: errorComment,
    comment: commentComment,
    loading: loadingComment,
    success: successComment,
  } = commentBlogPost;
  const { slug } = useParams();
  const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : `/blog/${slug}`;

  const submitComment = (e) => {
    e.preventDefault();
    dispatch(postComment(slug, comment));
  };

  // useEffect(() => {
  //   dispatch(blogDetailsAction(slug));
  //   if (successComment) {
  //     setComment("");
  //   }
  // }, [dispatch, slug, successComment]);
  useEffect(() => {
    dispatch(blogDetailsAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (successComment) {
      setComment("");
      dispatch(blogDetailsAction(slug));
      dispatch({ type: BLOG_COMMENT_RESET });
    }
  }, [dispatch, slug, successComment]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row className="justify-content-center align-items-center my-3">
            <Col>
              <h2 className="text-center mt-3">{blog.blog_title}</h2>
              <Image
                className="img-fluid mx-auto d-block my-3"
                src={blog.blog_image}
                alt={blog.blog_title}
              />

              {/* <p className="text-center">{blog.blog_content}</p> */}
              {userInfo ? (
                <p className="text-center">{blog.blog_content}</p>
              ) : (
                <div>
                  <p className="text-center">
                    {" "}
                    {blog.blog_content?.slice(0, 20)}...{" "}
                    <Link to={`/login?redirect=${redirect}`}>
                      Login to read the full blog!!!
                    </Link>
                  </p>
                </div>
              )}
            </Col>

            <Row className="justify-content-center align-items-center">
              <Col md={6} sm={12} lg={6} xl={6}>
                {loadingComment ? (
                  <Loader /> ? (
                    errorComment
                  ) : (
                    <Message>{errorComment}</Message>
                  )
                ) : (
                  <Form onSubmit={submitComment}>
                    <Form.Group as={Col} className="" controlId="commentText">
                      <Form.Label>Write Your Comment</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={6}
                        placeholder="Write your comment..."
                        style={{ resize: "vertical" }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="mx-auto mt-2"
                      variant="dark"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Col>
              <Col md={6} sm={12} lg={6} xl={6}>
                <h3>Other comments:</h3>
              </Col>
            </Row>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default BlogScreen;
