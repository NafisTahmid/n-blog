import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = loginUser;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      setEmail("");
      setPassword("");
      navigate(redirect);
    }
  }, [dispatch, navigate, redirect, userInfo]);
  return (
    <FormContainer>
      <h1>Sign In:</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="my-2">
            Sign In
          </Button>
          <p>
            Don't have an account?{" "}
            <Link to="/" className="text-primary">
              Register
            </Link>
          </p>
        </Form>
      )}
    </FormContainer>
  );
}

export default LoginScreen;
