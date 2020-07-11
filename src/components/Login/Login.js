import React, { useState } from "react";

import "./Login.css";

export const Login = ({ login }) => {
  const [pickedSymbol, setPickedSymbol] = useState(null);
  const [name, setName] = useState("");

  const request = () => {
    if (pickedSymbol && name.length > 1) login(name, pickedSymbol);
  };

  return (
    <div className={"LoginScreen"}>
      <p className={"loginText"}>LOGIN</p>
      <div className={"picker"}>
        <p className={"name"}>Name</p>
        <input
          className={"input"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={"picker"}>
        <div
          className={pickedSymbol === "x" ? "block pickedBlock" : "block"}
          onClick={() => setPickedSymbol("x")}
        >
          <p className={"info"}>x</p>
        </div>
        <div
          className={pickedSymbol === "o" ? "block pickedBlock" : "block"}
          onClick={() => setPickedSymbol("o")}
        >
          <p className={"info"}>o</p>
        </div>
      </div>

      <p className={"loginText btn"} onClick={request}>
        PLAY
      </p>
    </div>
  );
};
