import React, { useEffect } from "react";

import "./errorStack.css";

export const ErrorStack = ({ errors }) => {
  return (
    <div className={"errStack"}>
      {errors.map(
        (error, id) => (
          console.log(error),
          (
            <div className={error.isError ? "error" : "success"} key={id}>
              <p className={"name"}>{error.isError ? "ERROR" : "SUCCESS"}</p>
              <p className={"name"}>{error.message}</p>
            </div>
          )
        )
      )}
    </div>
  );
};
