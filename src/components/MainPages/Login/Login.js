import React, { useEffect, useState } from "react";
import { fLogin, fMain } from "../../../servises/login/login";
import "./Login.css";

export const Login = ({ changeToRegPage }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    fLogin(email, pass).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className={"login"}>
      <h1 className={"loginText"}>MiniGames.io</h1>
      <div className={"inputs"}>
        <input
          className={"input"}
          type="text"
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={"input"}
          type="password"
          placeholder={"password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className={"name loginBtn"} onClick={login}>
        login
      </div>
      <div className={"name loginBtn small"} onClick={changeToRegPage}>
        doesn't have account?
      </div>
    </div>
  );
};
