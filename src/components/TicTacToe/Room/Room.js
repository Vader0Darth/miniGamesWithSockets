import React, { useEffect, useState } from "react";

import "./Room.css";
import { useHistory } from "react-router-dom";

export const Room = ({ rooms, connect, createRoom }) => {
  const his = useHistory();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (!name) his.push("/");
  }, []);

  return (
    <div className={"Room"}>
      <div className="rooms">
        <div className="room">
          <p>Имя</p>
          <p>Знак</p>
        </div>
        <div className="room center" onClick={createRoom}>
          <p>создать</p>
        </div>
        {rooms.length > 0 &&
          rooms.map((data, key) => (
            <div
              className="room black"
              key={key}
              onClick={connect.bind(null, data.id)}
            >
              <p>{data.data.name}</p>
              <p>{data.data.symbol}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
