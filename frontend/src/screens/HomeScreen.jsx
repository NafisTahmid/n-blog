import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Blog from "../components/Blog";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { blogListAction } from "../actions/blogActions";
import { useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";
import BlogCarousel from "../components/BlogCarousel";


function HomeScreen() {
  const dispatch = useDispatch();
  const listBlog = useSelector((state) => state.blogList);
  const { blogs, error, loading, page: paginatorPage, pages } = listBlog;
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");
  if (keyword == null) {
    keyword = "";
  }
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    dispatch(blogListAction(keyword, page));
  }, [dispatch, keyword, page]);
  return (
    <div>
      <Container className="py-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            {!keyword && <BlogCarousel />}
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
            <Paginator
              page={paginatorPage}
              pages={pages}
              keyword={keyword}
              isAdmin={false}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default HomeScreen;
