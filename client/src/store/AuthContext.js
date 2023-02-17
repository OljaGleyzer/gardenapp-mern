import { createContext } from "react";
import { useState, useEffect } from "react";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  //   console.log("Auth context runs");
  const [loginUser, setLoginUser] = useState(null);
  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    // console.log("loginUser", loginUser);
  };

  const login = (email, password) => {
    // Check email format, password length ...avoid making useless requests to the server

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          console.log(result.token);
          localStorage.setItem("token", result.token);
          setLoginUser(result.user);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUser(null);
  };

  useEffect(() => {
    const token = getToken();
    console.log("token", token);

    if (token) {
      console.log("LOGGED IN");
    } else {
      console.log("NOT logged in");
    }
  }, [loginUser]);

  return (
    <AuthContext.Provider
      value={{ handleChangeHandler, loginUser, setLoginUser, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
