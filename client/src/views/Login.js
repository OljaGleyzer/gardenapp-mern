import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginUser, setLoginUser] = useState(null);
  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
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
        name="pasword"
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
        // onClick={fetchSignUp}
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
};

export default Login;
