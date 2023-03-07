import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  // Computed property Names, event handler for all 3 events
  const [newUser, setNewUser] = useState(null);

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const fetchSignUp = async () => {
    console.log("newUser", newUser);
    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    console.log('urlenconded.get("password)', urlencoded.get("password"));
    urlencoded.append(
      "userPicture",
      newUser.userPicture
        ? newUser.userPicture
        : "https://res.cloudinary.com/dvqfcis2q/image/upload/v1677069630/Plants/magritte_1_hdpqmv.png"
    );

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="sign-up-page">
        {/* {newUser.userName ? (
        console.log("loggedinUser", newUser)
      ) : ( */}
        <h1>Please register: </h1>
        {/*  )} */}
        {/*
       <input
        value={userName}
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      /> */}
        <input
          // value={password}
          type="text"
          name="userName"
          id="userName"
          placeholder="User Name"
          onChange={handleChangeHandler}
        />
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
          onClick={fetchSignUp}
          // disabled={
          //   newUser.password.length < 6 ||
          //   !newUser.email.includes("@") ||
          //   !newUser.email.includes(".")
          //     ? true
          //     : false
          // }
        >
          Signup
        </button>
        <Link to="/login">
          <button className="login-button">Got an Acount? Login!</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
