import { useHref, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { getToken } from "../utils/getToken";

const MyProfile = () => {
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const inputFileRef = useHref(null);

  const getProfile = async () => {
    const token = getToken();

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
        console.log("result>>", result);
        setUserProfile({
          userName: result.user.userName,
          email: result.user.email,
          userPicture: result.user.userPicture,
        });
        // console.log("userProfile", userProfile);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("you need to log in first");
      setError("you need to log in first");
      setUserProfile(null);
    }
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);
    console.log("formData :>> ", formdata);
    // formdata.append("userName", newUsername);
    // formdata.append("password", newPassword);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageupload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);

      try {
        const token = getToken();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("imageURL", result.imageUrl);
        // urlencoded.append("password", result.newPassword);
        // urlencoded.append("userName", result.newUsername);

        const requestOptions2 = {
          method: "PUT",
          headers: myHeaders,
          body: urlencoded,
        };

        fetch(
          "http://localhost:5000/api/users/updateuserimage",
          requestOptions2
        )
          .then((response) => response.json())
          .then((result) => console.log(result));
      } catch (error) {
        console.log("error", error);
      }

      setUserProfile({
        ...userProfile,
        userPicture: result.imageUrl,
        // password: result.newPassword,
        // userName: result.username,
      });
      console.log("userProfile", userProfile);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getProfile();
    console.log("usereffect running");
    // setUserProfile({ ...userProfile, userPicture: result.imageUrl });
  }, []);

  return (
    <div className="container text-center">
      <h1> Welcome {userProfile?.userName}</h1>
      <span className="user-picture">
        {userProfile && (
          <img
            src={userProfile.userPicture}
            alt="Avatar"
            style={{
              width: "100px",
              borderRadius: "50%",
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
          ></img>
        )}
      </span>

      <h2> Personal Information</h2>
      <p>Email: {userProfile?.email}</p>
      <p>Username: {userProfile?.userName}</p>
      <h2> Change your Information</h2>
      <form>
        <input type="file" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload picture</button>
        <br />
        <input
          type="text"
          placeholder="New username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <button onClick={submitForm}>Save changes</button>
      </form>
    </div>
  );
};

export default MyProfile;
