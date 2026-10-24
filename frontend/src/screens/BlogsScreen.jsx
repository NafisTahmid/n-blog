import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { blogListAction } from "../actions/blogActions";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Paginator from "../components/Paginator";
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

  const deleteHandler = () => {
    console.log("Test");
  };

  useEffect(() => {
    if (!userInfo || !userInfo.is_admin) {
      navigate("/login");
    } else {
      dispatch(blogListAction(keyword, page));
    }
  }, [userInfo, navigate, dispatch, keyword, page]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="justify-content-center align-items-center">
            <Col md={12} lg={10} sm={12}>
              <h1>All Blogs: </h1>
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
                          <Link to={`/admin/blogs/${blog.slug}`}>
                            <i
                              className="fa fa-pencil"
                              style={{ color: "yellow" }}
                            ></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <Button onClick={() => deleteHandler(blog.id)}>
                            <i
                              className="fa fa-trash"
                              style={{ color: "red" }}
                            ></i>
                          </Button>
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
              </div>
            </Col>
            <Col lg={2} md={12}>
              <Button size="lg">
                {" "}
                Add Blog <i className="fa-solid fa-plus"></i>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BlogsScreen;
