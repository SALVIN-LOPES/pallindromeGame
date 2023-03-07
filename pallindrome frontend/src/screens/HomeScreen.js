import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { startGame } from "../actions/gameActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Game = useSelector((state) => state.Game);
  const { game } = Game;

  const submitHandler = () => {
    localStorage.setItem("gameInfo", JSON.stringify(game));
    console.log("game started!!");
    dispatch(startGame());
    navigate(`/start`);
  };

  return (
    <FormContainer>
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          The game description states that "The game is between you & computer
          There will be total of 6 entries of string alternatively being entered
          by you & machine when the string length becomes 6 check for
          pallindrome string!!"
        </p>
        <hr />
        <p className="mb-0">
          To start the Pallindrome game please press start Button!!
        </p>
      </Alert>
      <Button onClick={submitHandler} type="submit" variant="dark">
        Start
      </Button>
    </FormContainer>
  );
};

export default HomeScreen;
