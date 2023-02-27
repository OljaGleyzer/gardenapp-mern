import { createContext } from "react";
import { useState, useEffect } from "react";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  //   console.log("Auth context runs");
  //   const [loginUser, setLoginUser] = useState(null); //FIXME check if you can delete this state
  const [loggedinUser, setLoggedinUser] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const login = (email, password) => {
    console.log("auth login", email, password);
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
        console.log(result.msg);
        console.log(result);
        setMessage(result.msg);

        if (result.token) {
          console.log(result.token);
          localStorage.setItem("token", result.token);
          setLoggedinUser(result.user);

          setMessage(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };
  console.log("%cloggedInUser context:::", "color:red", loggedinUser);
  const logout = () => {
    console.log("logging out user");
    localStorage.removeItem("token");
    setLoggedinUser(null);
  };

  useEffect(() => {
    const token = getToken();
    console.log("token", token);

    if (token) {
      console.log("LOGGED IN");
    } else {
      console.log("NOT logged in");
    }
  }, [loggedinUser]);

  return (
    <AuthContext.Provider
      value={{
        // handleChangeHandler,
        // loginUser,
        // setLoginUser,
        loggedinUser,

        login,
        logout,
        getToken,
        message,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
