import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProfileData } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../actions/userActions";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileUser = useSelector((state) => state.userProfile);
  const updateProfileUser = useSelector((state) => state.userUpdateProfile);
  const { error, loading, userInfo: userInfoDetails } = profileUser;
  const loginUser = useSelector((state) => state.userLogin);
  const { userInfo } = loginUser;

  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
    userPInfo: userProfileInfoUpdate,
  } = updateProfileUser;

 
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (!userInfoDetails) {
      dispatch(getProfileData());
    }
  }, [dispatch, navigate, userInfo, userInfoDetails]);

  
  useEffect(() => {
    if (userInfoDetails) {
      setName(userInfoDetails.name || "");
      setEmail(userInfoDetails.email || "");
      setPassword("");
    }
  }, [userInfoDetails]);

  
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
    }
  }, [successUpdate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email, password));
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={12} lg={8}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <FormContainer>
              <h1>My Profile: </h1>
              <Form onSubmit={handleSubmit}>
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
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="my-2">
                  Update Profile
                </Button>
              </Form>
            </FormContainer>
          )}
        </Col>
        <Col md={12} lg={4}>
          <h1>My subscriptions: </h1>
        </Col>
      </Row>
    </Container>
  );
}
