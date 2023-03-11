import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { useLocation } from "react-router-dom";
import { getAdminUsersList } from "../actions/gameActions";
import { deleteUser } from "../actions/userActions";
import { USER_DELETE_RESET } from "../constants/userConstants";

const AdminListUsers = () => {
  const dispatch = useDispatch();

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: userDeleteLoading, success: userDeleteSuccess } = userDelete;

  useEffect(() => {
    if (userDeleteSuccess) {
      dispatch({
        type: USER_DELETE_RESET,
      });
      dispatch(getAdminUsersList());
    } else {
      dispatch(getAdminUsersList());
    }
  }, [userDeleteSuccess, dispatch]);

  const getAdminUsers = useSelector((state) => state.getAdminUsers);
  const { users } = getAdminUsers;

  const deleteHandler = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.username} ?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div>
      <h1>Admin Users List</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>ISADMIN</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users ? (
            users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <p>True</p> : <p>False</p>}</td>

                <td>
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit">Edit</i>
                    </Button>
                  </LinkContainer>{" "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user)}>
                    <i className="fas fa-trash">Delete</i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <h1>There are no users to display</h1>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminListUsers;
