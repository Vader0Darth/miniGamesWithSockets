import React, { useEffect, useState } from "react";

import { Room } from "./Room/Room";
import { App } from "./Game/App";
import socketIOClient from "socket.io-client";
import { Login } from "./Login/Login";

import "../index.css";
import { fLogin } from "../servises/login/login";

const ENDPOINT = "http://localhost:80";

export const Main = () => {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [logged, setLogged] = useState(false);
  const [isOnRoom, setIsOnRoom] = useState(null);

  const [enemy, setEnemy] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    let sda = socketIOClient(ENDPOINT);
    console.log(sda);
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

  return (
    <div className={"Page"}>
      {logged ? (
        <>
          {isOnRoom ? (
            <App room={room} enemy={enemy} turn={tryToTurn} />
          ) : (
            <Room
              passGameData={passGameData}
              rooms={rooms}
              connect={connect}
              createRoom={createRoom}
              socket={socket}
            />
          )}
        </>
      ) : (
        <Login login={passGameData} />
      )}
    </div>
  );
};
