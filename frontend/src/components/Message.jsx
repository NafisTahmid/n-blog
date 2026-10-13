import Alert from "react-bootstrap/Alert";
import React from "react";

const Message = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
