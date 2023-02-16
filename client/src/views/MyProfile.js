import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function MyProfile() {
  //  const [selectedFile, setSelectedFile] = useState(null);
  //   const attachFileHandler = (e) => {
  //     setSelectedFile(e.target.files[0]);
  //     };
  //      const submitForm = async (e) => {
  //        e.preventDefault();
  //        const formdata = new FormData();
  //        formdata.append("image", selectedFile);
  //        console.log("formData :>> ", formdata);
  //        const requestOptions = {
  //          method: "POST",
  //          body: formdata,
  //        };
  //        try {
  //          const response = await fetch(
  //            "http://localhost:5000/api/users/imageupload",
  //            requestOptions
  //          );
  //          const result = await response.json();
  //          console.log("result", result);
  //          setNewUser({ ...newUser, userPicture: result.imageUrl });
  //        } catch (error) {
  //          console.log("error :>> ", error);
  //        }
  //      };
  //   return (
  //     <div className="container text-center">
  //       <h1> Welcome Plantlover {/* {user.displayName} */}</h1>
  //       <form>
  //         <input type="file" onChange={attachFileHandler} />
  //         <button onClick={submitForm}>Upload picture</button>
  //       </form>
  //       <img
  //         src={newUser.userPicture}
  //         alt="avatar pic"
  //         style={{ width: "100px" }}
  //       />
  //       <h2> Personal Information</h2>
  //       <p>Email: {/* {user.email} */}</p>
  //       <p>Username:{/*  {user.displayName} */}</p>
  //       <h2>Account Settings</h2>
  //       <form>
  //         <label>
  //           Change Username:
  //           <br />
  //           <div className="profile-username-container">
  //             <input
  //               type="text"
  //               id="username"
  //               name="username"
  //               onChange={handleNameChange}
  //             />
  //             <button className="username-button" onClick={handleUserName}>
  //               Submit
  //             </button>
  //           </div>
  //         </label>
  //         <br />
  //         {/* <label>
  //           Change Password:
  //           <br />
  //           <input type="password" id="password" name="password" />
  //         </label>
  //         <br />
  //         <label>
  //           Change Email:
  //           <br />
  //           <input type="email" id="email" name="Email" />
  //         </label>
  //         <br /> */}
  //       </form>
  //       <br />
  //       {/* <h2>Your Orders</h2> */}
  //     </div>
  //   );
}

export default MyProfile;
