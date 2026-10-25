import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserAction, updateUserAction } from "../actions/userActions";
import { useParams, useNavigate } from "react-router-dom";
import {
  USER_GET_REQUEST,
  USER_UPDATE_REQUEST,
} from "../constants/userConstants";
const UpdateUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const userUpdate = useSelector((state) => state.userUpdate);
  const userGet = useSelector((state) => state.userGet);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    updatedUser: updatedUserUpdate,
    success: successUpdate,
  } = userUpdate;
  const { error, loading, fetchedUser, success } = userGet;
  const loginUser = useSelector((state) => state.userLogin);
  const { userInfo } = loginUser;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!fetchedUser) {
      dispatch(getUserAction(id));
    } else {
      setName(fetchedUser.name);
      setEmail(fetchedUser.email);
      setIsAdmin(fetchedUser.is_admin);
      dispatch({
        type: USER_GET_REQUEST,
      });
    }
  }, [dispatch, id, navigate, userInfo, fetchedUser]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_GET_REQUEST,
      });
    }
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });
      setName(updatedUserUpdate.name);
      setEmail(updatedUserUpdate.email);
      setIsAdmin(updatedUserUpdate.is_admin);
    }
  }, [success, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(id, name, email, isAdmin));
  };

  return (
    <FormContainer>
      <h1>Update User:</h1>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error || errorUpdate ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isAdmin" className="my-2">
            <Form.Check
              label="Is Admin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit">Update User</Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UpdateUserScreen;
