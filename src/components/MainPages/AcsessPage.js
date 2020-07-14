import React, { useState } from "react";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

export const AcsessPage = ({}) => {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState("login");

  const changePage = () => {
    setPage(page === "login" ? "!login" : "login");
  };

  return (
    <div>
      {page === "login" ? (
        <Login changeToRegPage={changePage} />
      ) : (
        <Register changeToRegPage={changePage} />
      )}
    </div>
  );
};
