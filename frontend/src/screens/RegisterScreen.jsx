import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { register } from "../actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = registerUser;
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
      navigate(redirect);
    }
  }, [dispatch, navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and confirm password don't match!!!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up: </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : message ? (
        <div>
          <Message variant="danger">{message}</Message>
          <Link to="/register">Try again</Link>
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            />
          </Form.Group>
          <Button type="submit" className="my-2">
            Register
          </Button>
          <p>
            Already have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <span>Login!!!</span>
            </Link>
          </p>
        </Form>
      )}
    </FormContainer>
  );
}
