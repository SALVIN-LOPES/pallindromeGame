// 20022001@Sc
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = Location.search ? Location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };
    console.log("user = ", user);
    dispatch(login(user));
  };
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {/* {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          New Customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
