import React, { useState, useEffect } from "react";
import "./App.css";

export const App = ({ enemy, room, turn }) => {

  console.log(room);

  return (
    <div className="App">
      <p className={"name"}>Tic Tac Toe</p>
      <div className="game">
        {room.gameField.map((row, rId) => (
          <div className="row" key={rId}>
            {row.map((col, cId) => (
              <div
                key={rId + 9 + cId}
                className="col"
                onClick={turn.bind(null, rId, cId)}
              >
                <p>{col}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
