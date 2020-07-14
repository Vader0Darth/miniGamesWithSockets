import React, { useEffect, useState, useRef } from "react";

import { Room } from "./TicTacToe/Room/Room";
import { App } from "./TicTacToe/Game/App";
import socketIOClient from "socket.io-client";
import { Login } from "./SignIn/Login/Login";
import { Register } from "./SignIn/Register/Register";

import "../index.css";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  useHistory,
} from "react-router-dom";
import { ErrorStack } from "./errorStack/ErrorStack";

const ENDPOINT = "http://localhost:80";

export const Main = () => {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [logged, setLogged] = useState(false);
  const [isOnRoom, setIsOnRoom] = useState(null);

  const history = useHistory();

  const [enemy, setEnemy] = useState(null);
  const [room, setRoom] = useState(null);

  const [errors, setError] = useState([]);
  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners("rooms");
      socket.removeAllListeners("Error");
      socket.removeAllListeners("succesLogin");
      socket.removeAllListeners("updateRoom");
      socket.removeAllListeners("someOneConnected");

      socket.on("rooms", (data) => setRooms(JSON.parse(data)));
      socket.on("Error", (error) => alert(error));

      socket.on("succesLogin", (data) => {
        if (data) setLogged(true);
      });

      socket.on("updateRoom", (data) => {
        if (room) {
          room.gameField = data;
          setRoom({ ...room });
        }
      });

      socket.on("someOneConnected", (data) => {
        setEnemy(data.enemy);
        setRoom(data.room);
      });
    }
  }, [socket, room, setRoom]);

  useEffect(() => {
    if (enemy && room != null) setIsOnRoom(true);
  }, [enemy, room]);

  const passGameData = (name, symbol) => {
    if (socket) socket.emit("passGameDate", { name: name, symbol: symbol });
  };

  const connect = (id) => {
    if (socket) socket.emit("connectTo", { roomId: id });
  };

  const createRoom = () => {
    if (socket !== null) socket.emit("createRoom");
  };

  const tryToTurn = (rid, cid) => {
    if (socket !== null)
      socket.emit("turn", { rid: rid, cid: cid, roomId: room.id });
  };

  const pushError = (error, isError) => {
    let errorObj = new Object();
    errorObj.message = error;
    errorObj.isError = isError;
    setTimeout(() => {
      errorsRef.current.splice(0, 1);
      setError([...errorsRef.current]);
      // console.log(errorsRef.current);
    }, 8000);

    setError([...errors, errorObj]);
  };

  return (
    <Router>
      <ErrorStack errors={errors} />
      <Switch>
        <Route exact path={"/"}>
          <Login pushError={pushError} />
        </Route>
        <Route exact path={"/register"}>
          <Register pushError={pushError}/>
        </Route>
        <Route exact path={"/mainMenu"}>
          <Room rooms={rooms} connect={connect} createRoom={createRoom} />
        </Route>
      </Switch>
    </Router>
  );
};
