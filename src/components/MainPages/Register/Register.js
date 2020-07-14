import React, { useEffect, useState } from "react";
import { fRegister } from "../../../servises/login/login";
import "./Register.css";

export const Register = ({ changeToRegPage }) => {
  //   useEffect(() => {
  //     fLogin("email", "pass").then((data) => {
  //       console.log(data);
  //     });
  //   }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = () => {
    fRegister(email, name, password).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className={"login"}>
      <h1 className={"loginText"}>Register to MiniGames.io</h1>
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
          type="text"
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={"input"}
          type="password"
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={"input"}
          type="password"
          placeholder={"repit password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>
      <div className={"name loginBtn"} onClick={register}>
        Register
      </div>
      <div className={"name loginBtn small"} onClick={changeToRegPage}>
        does you have an account?
      </div>
    </div>
  );
};
