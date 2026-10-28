import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import {
  blogListAction,
  blogDeleteAction,
  blogCreateAction,
} from "../actions/blogActions";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Paginator from "../components/Paginator";
import { BLOG_CREATE_RESET } from "../constants/blogConstants";
const BlogsScreen = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page") || 1;
  let keyword = searchParams.get("keyword");
  if (keyword == null) {
    keyword = "";
  }
  const allBlogs = useSelector((state) => state.blogList);
  const { blogs, error, loading, page: paginatePage, pages } = allBlogs;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const deleteBlog = useSelector((state) => state.blogDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = deleteBlog;

  const createBlog = useSelector((state) => state.blogCreate);
  const {
    blog: blogCreate,
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = createBlog;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this blog")) {
      dispatch(blogDeleteAction(id));
    }
  };
  const createHandler = () => {
    dispatch(blogCreateAction());
  };

  useEffect(() => {
    if (!userInfo || !userInfo.is_admin) {
      navigate("/login");
    } else {
      dispatch(blogListAction(keyword, page));
    }
  }, [userInfo, navigate, dispatch, keyword, page]);

  useEffect(() => {
    if (successDelete) {
      dispatch(blogListAction(keyword, page));
    }
    if (successCreate) {
      dispatch({
        type: BLOG_CREATE_RESET,
      });
      navigate(`/admin/blogs/update/${blogCreate.slug}`);
    }
  }, [
    successDelete,
    dispatch,
    keyword,
    page,
    blogCreate,
    navigate,
    successCreate,
  ]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="justify-content-between align-items-center">
            <Col md={12} lg={10} sm={12}>
              <h1>All Blogs: </h1>
            </Col>
            <Col lg={2} md={12}>
              <Button size="lg" onClick={createHandler}>
                {" "}
                Create Blog <i className="fa-solid fa-plus"></i>
              </Button>
            </Col>
          </Row>
          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Slug</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="text-center">{blog.id}</td>
                    <td className="text-center">{blog.blog_title}</td>
                    <td className="text-center">{blog.slug}</td>
                    <td className="text-center">
                      <Link to={`/admin/blogs/update/${blog.slug}`}>
                        <i
                          className="fa fa-pencil"
                          style={{ color: "yellow" }}
                        ></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      {loadingDelete ? (
                        <Loader />
                      ) : errorDelete ? (
                        <Message variant="danger">{errorDelete}</Message>
                      ) : (
                        <Button onClick={() => deleteHandler(blog.id)}>
                          <i
                            className="fa fa-trash"
                            style={{ color: "red" }}
                          ></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginator
              page={paginatePage}
              pages={pages}
              keyword={keyword}
              isAdmin={false}
            />
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          </div>
        </>
      )}
    </Container>
  );
};

export default BlogsScreen;
