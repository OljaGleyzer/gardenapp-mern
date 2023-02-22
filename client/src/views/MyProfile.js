import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getToken } from "../utils/getToken";

const MyProfile = async () => {
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const token = getToken();

  // useEffect(() => {
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/myprofile",
        requestOptions
      );
      const result = await response.json();
      setUserProfile({
        userName: result.user.userName,
        email: result.user.email,
        userPicture: result.user.userPicture,
      });
    } catch (error) {
      console.log("error", error);
    }
  } else {
    console.log("you need to log in first");
    setError("you need to log in first");
    setUserProfile(null);
  }
  // }, []);

  // const [selectedFile, setSelectedFile] = useState(null);
  // const attachFileHandler = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };
  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   formdata.append("image", selectedFile);
  //   console.log("formData :>> ", formdata);
  //   const requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/users/imageupload",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     console.log("result", result);
  //     setNewUser({ ...newUser, userPicture: result.imageUrl });
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };
  return (
    <div className="container text-center">
      <span className="user-picture">
        {userProfile.userPicture && (
          <img src={userProfile.userPicture} alt="Avatar"></img>
        )}
      </span>
      <h1> Welcome {userProfile.userName}</h1>
      {/* <form>
        <input type="file" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload picture</button>
      </form> */}
      <img
        src={userProfile.userPicture}
        alt="avatar pic"
        style={{ width: "100px" }}
      />
      <h2> Personal Information</h2>
      <p>Email: {userProfile.email}</p>
      <p>Username:{userProfile.userName}</p>
      <h2>Account Settings</h2>
      <form>
        <label>
          Change Username:
          <br />
          <div className="profile-username-container">
            <input
              type="text"
              id="username"
              name="username"
              // onChange={handleNameChange}
            />
            <button className="username-button" /* onClick={handleUserName} */>
              Submit
            </button>
          </div>
        </label>
        <br />
        {/* <label>
              Change Password:
              <br />
              <input type="password" id="password" name="password" />
            </label>
            <br />
            <label>
              Change Email:
              <br />
              <input type="email" id="email" name="Email" />
            </label>
            <br /> */}
      </form>
      <br />
      {/* <h2>Your Orders</h2> */}
    </div>
  );
};

export default MyProfile;
