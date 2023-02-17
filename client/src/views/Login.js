import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { useEffect } from "react";
import { AuthContext } from "../store/AuthContext";

function Login() {
  // const [loginUser, setLoginUser] = useState(null);
  const { login, handleChangeHandler, setLoginUser, loginUser } =
    useContext(AuthContext);

  function handleController() {
    handleChangeHandler();
  }

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
    </div>
  );
}

export default Login;
