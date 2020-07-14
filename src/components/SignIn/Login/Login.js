import React, { useState } from "react";
import { fLogin } from "../../../servises/login/login";
import "./Login.css";
import { useHistory } from "react-router-dom";

export const Login = ({ pushError }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const his = useHistory();

  const login = () => {
    fLogin(email, pass).then((data) => {
      console.log(data);
      if (data.status === "true") {
        localStorage.setItem("name", email);
        his.push("mainMenu");
      } else pushError(data.error);
    });
  };

  const changeToRegPage = () => {
    his.push("/register");
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
