import React from "react";
import { Row, Col, Container } from "react-bootstrap";
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <p className="text-center">
              Copyright &copy; Kong | All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
