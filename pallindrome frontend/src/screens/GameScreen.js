import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import { useDispatch, useSelector } from "react-redux";
import { getGame, updateGame } from "../actions/gameActions";

const GameScreen = () => {
  const Game = useSelector((state) => state.Game);
  // const { game } = Game;
  // console.log("redux game = ", game);
  const game = localStorage.getItem("gameInfo");
  const parsedGame = JSON.parse(game);
  console.log("gameInfo = ", parsedGame);
  // console.log("gameInfoId = ", game.id);

  const getGameString = useSelector((state) => state.getGameString);
  const { loading, success, game: getGameBackend } = getGameString;

  const [string, setString] = useState("");
  console.log("string = ", string);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Game) {
      navigate(`/start`);
    }
    if (success) {
      console.log("getgame = ", getGameBackend);
      // setString(getGameBackend.string);
      setString(parsedGame.string);
    }
  }, [Game, dispatch, navigate, success, getGameBackend]);

  const UpdateGameHandler = (e) => {
    e.preventDefault();
    const game = {
      id: parsedGame.id,
      string: string,
    };
    if (Game) {
      dispatch(updateGame(game));
    }
    console.log("game updated successfully!!");
  };
  const GetGameHandler = (e) => {
    e.preventDefault();

    const data = {
      pk: parsedGame.id,
      string: string,
    };
    dispatch(getGame(data));
    console.log("get game successfully!!");
  };

  const playAgainHandler = () => {
    localStorage.removeItem("gameInfo");
    navigate("/");
  };

  return (
    <FormContainer>
      <Alert variant="success">
        <Alert.Heading>Game Id : {parsedGame.id}</Alert.Heading>
        <hr />
        <p className="mb-0">The game is being Initialized!!</p>
      </Alert>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter String</Form.Label>
          <Form.Control
            onChange={(e) => setString(e.target.value)}
            value={string}
            type="text"
            placeholder="Enter string..."
          />
        </Form.Group>
        <Button onClick={UpdateGameHandler} variant="primary" type="submit">
          Update
        </Button>{" "}
        <Button onClick={GetGameHandler} variant="primary" type="submit">
          getBoard
        </Button>
      </Form>{" "}
      {string?.length == 6 && getGameBackend?.result ? (
        <>
          <Alert variant="success" className="mt-3">
            <Alert.Heading>The String {string} is Pallindrome!!</Alert.Heading>
          </Alert>
        </>
      ) : (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>
            The String {string} is Not Pallindrome!!
          </Alert.Heading>
        </Alert>
      )}
      {string?.length >= 6 && (
        <Button onClick={playAgainHandler} variant="primary" type="submit">
          Play Again
        </Button>
      )}
    </FormContainer>
  );
};

export default GameScreen;
