import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { useEffect } from "react";
import { AuthContext } from "../store/AuthContext";

function Login() {
  // const [loginUser, setLoginUser] = useState(null);
  const { login, logout, handleChangeHandler, setLoginUser, loginUser } =
    useContext(AuthContext);

  function handleController() {
    handleChangeHandler();
  }
  // const handleChangeHandler = (e) => {
  //   setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  //   // console.log("loginUser", loginUser);
  // };

  // const login = () => {
  //   // Check email format, password lenght ...avoid making useless requests to the server

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("email", loginUser.email);
  //   urlencoded.append("password", loginUser.password);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:5000/api/users/login", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       if (result.token) {
  //         console.log(result.token);
  //         localStorage.setItem("token", result.token);
  //         setLoginUser(result.user);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setLoginUser(null);
  // };
  // useEffect(() => {
  //   const token = getToken();

  //   if (token) {
  //     console.log("LOGGED IN");
  //   } else {
  //     console.log("NOT logged in");
  //   }
  // }, [loginUser]);

  return (
    <div className="login">
      {/*    {newUser.email ? <h1>Hello {user.email}</h1> : */}
      <h1>Please Login: </h1>

      <input
        // value={email}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChangeHandler}
      />
      <input
        // value={password}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        onChange={handleChangeHandler}
      />
      {/* {errorMessage ? (
        <p>
          {" "}
          <small>{errorMessage}</small>
        </p>
      ) : null} */}
      <button
        className="register-button"
        onClick={login}
        // disabled={
        //   newUser.password.length < 6 ||
        //   !newUser.email.includes("@") ||
        //   !newUser.email.includes(".")
        //     ? true
        //     : false
        // }
      >
        Login
      </button>
      <Link to="/signup">
        <button className="login-button">No Acount? Sign Up!</button>
      </Link>
      <button className="register-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Login;
