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
  console.log("redux game = ", Game);

  const getGameString = useSelector((state) => state.getGameString);
  const { loading, success, game } = getGameString;

  const [string, setString] = useState(Game.string);
  console.log("string = ", string);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Game) {
      navigate(`/start`);
    }
    if (success) {
      console.log("getgame = ", game);
      setString(game.string);
    }
  }, [Game, dispatch, navigate, success, game]);

  const UpdateGameHandler = (e) => {
    e.preventDefault();
    const game = {
      id: Game.id,
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
      pk: Game.id,
      string: string,
    };
    dispatch(getGame(data));
    console.log("get game successfully!!");
  };

  return (
    <FormContainer>
      <Alert variant="success">
        <Alert.Heading>Game Id : {Game.id}</Alert.Heading>
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
      </Form>
    </FormContainer>
  );
};

export default GameScreen;
