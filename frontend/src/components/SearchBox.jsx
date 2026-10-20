import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(window.location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md={10}>
          <Form.Control
            className="mx-3 ml-sm-2 mr-sm-5"
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button className="p-2" type="submit" variant="outline-success">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
