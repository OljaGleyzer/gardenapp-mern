import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getToken } from "../utils/getToken";

const MyProfile = () => {
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

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
        console.log("userProfile", userProfile);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("you need to log in first");
      setError("you need to log in first");
      setUserProfile(null);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile);
    console.log("formData :>> ", formdata);
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
      setUserProfile({ ...userProfile, userPicture: result.imageUrl });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getProfile();
    console.log("useREffect running");
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
            style={{ width: "100px", borderRadius: "50%" }}
          ></img>
        )}
      </span>

      <form>
        <input type="file" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload picture</button>
      </form>

      <h2> Personal Information</h2>
      <p>Email: {userProfile?.email}</p>
      <p>Username:{userProfile?.userName}</p>
    </div>
  );
};

export default MyProfile;
