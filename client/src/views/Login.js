import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { useEffect } from "react";
import { AuthContext } from "../store/AuthContext";

function Login() {
  // const [loginUser, setLoginUser] = useState(null);
  const [loginUser, setLoginUser] = useState({});
  const { login, message } = useContext(AuthContext);

  // function handleController() {
  //   handleChangeHandler();
  // }

  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    console.log("loginUser", loginUser);
  };

  const submitLogin = () => {
    login(loginUser.email, loginUser.password);
  };
  return (
    <div className="login">
      {loginUser ? (
        <h1>Hello {loginUser.userName}</h1>
      ) : (
        <h1>Please Login: </h1>
      )}

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
      {message ? (
        <p>
          {" "}
          <small>{message}</small>
        </p>
      ) : null}
      <button
        className="register-button"
        onClick={submitLogin}
        // disabled={
        //   loginUser.password.length < 6 ||
        //   !loginUser.email.includes("@") ||
        //   !loginUser.email.includes(".")
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
