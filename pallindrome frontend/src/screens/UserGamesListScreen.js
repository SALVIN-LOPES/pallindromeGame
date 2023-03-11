import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { useLocation } from "react-router-dom";
import { getUserGames } from "../actions/gameActions";

const UserGamesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserListGames = useSelector((state) => state.getUserListGames);
  const { usergames } = getUserListGames;

  useEffect(() => {
    dispatch(getUserGames());
  }, [dispatch]);

  return (
    <div>
      <h1>Games List</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>STRING</th>
            <th>RESULT</th>
            <th>CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          {usergames ? (
            usergames.map((game) => (
              <tr>
                <td>{game.id}</td>
                <td>{game.string}</td>
                <td>{game.result ? "Pallindrome" : "No Pallindrome"}</td>
                <td>{game.createdAt.substring(0, 10)}</td>

              </tr>
            ))
          ) : (
            <h1>There are no user Games</h1>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserGamesScreen;
