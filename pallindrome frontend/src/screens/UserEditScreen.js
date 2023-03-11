import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUser, getUserDetails } from "../actions/userActions";
import { ADMIN_UPDATE_USER_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get userInfo from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error, loading } = userDetails;

  const updateAdminUser = useSelector((state) => state.updateAdminUser);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = updateAdminUser;

  const { id } = useParams();

  const [name, setName] = useState(user.name);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  useEffect(() => {
    if (updateSuccess) {
      dispatch({
        type: ADMIN_UPDATE_USER_RESET,
      });
      navigate(`/admin/userlist`);
    } else {
      if (!user || user.id != id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setUserName(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user,updateSuccess,dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      id,
      name,
      username,
      email,
      isAdmin,
    };
    console.log("admin user update = ", user);
    dispatch(adminUpdateUser(user));

    console.log("user updated successfully!!");
  };
  //  20022001@Sc

  return (
    <div>
      <Link to={`/admin/userlist`}>Go Back</Link>

      <FormContainer>
        <h1>Edit User {id}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <br />

          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>
          <br />
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
