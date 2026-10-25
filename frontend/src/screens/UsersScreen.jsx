import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Container, Table } from "react-bootstrap";
import { deleteUserAction } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";

const UsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersGet = useSelector((state) => state.getUsers);
  const deleteUser = useSelector((state) => state.userDelete);

  const { error, loading, users } = usersGet;
  const {
    error: deleteError,
    loading: deleteLoading,
    success: deleteSuccess,
  } = deleteUser;

  const loginUser = useSelector((state) => state.userLogin);
  const { userInfo } = loginUser;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getUsersAction());
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getUsersAction());
    }
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };
  return (
    <Container>
      <h1>All Users:</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="text-center">#</th>

              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">
                  {user.is_admin ? (
                    <i className="fa fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fa fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="text-center">
                  <Link to={`/admin/users/${user.id}`}>
                    <i className="fa fa-pencil" style={{ color: "yellow" }}></i>
                  </Link>
                </td>
                <td className="text-center">
                  {deleteLoading ? (
                    <Loader />
                  ) : deleteError ? (
                    <Message variant="danger">{deleteError}</Message>
                  ) : (
                    <Button onClick={() => deleteHandler(user.id)}>
                      <i className="fa fa-trash" style={{ color: "red" }}></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UsersScreen;
