export const fLogin = (email, pass) => {
  return fetch("http://localhost:80/login", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: pass }),
    method: "POST",
  }).then((res) => res.json());
};

export const fRegister = (email, pass, name) => {
  return fetch("http://localhost:80/register", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: pass, name: name }),
    method: "POST",
  }).then((res) => res.json());
};

export const fMain = () => {
  return fetch("http://localhost:80/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => res.json());
};