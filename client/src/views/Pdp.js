import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../store/AuthContext";
import { getToken } from "../utils/getToken";

function Pdp() {
  const { _id } = useParams();
  console.log("useParams()", useParams());
  const { plant, error, isLoading } = useFetch(_id); // add plant to pass it from useFetch but an array
  console.log("plant", plant);
  const [selectedPlant, setSelectedPlant] = useState(null);
  console.log("selctedPlant", selectedPlant);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({
    text: "",
    author: "",
    authorPicture: "",
  });
  const [inputText, setInputText] = useState("");
  const [updatedComments, setUpdatedComments] = useState([]);

  const { loggedinUser } = useContext(AuthContext);
  console.log("%cloggedinUser", "color:orange", loggedinUser); //FIXME - loggedinUser is undefined why?

  const handleDeletePlant = async () => {
    const token = getToken();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", selectedPlant._id);
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch(
        "http://localhost:5000/api/plants/all",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  //post comment
  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setInputText(e.target.value);
    setNewComment({
      ...newComment,
      text: e.target.value,
    });
  };

  const handleComment = async () => {
    const token = getToken();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      setNewComment({
        ...newComment,
        author: loggedinUser.userName,
        authorPicture: loggedinUser.userPicture,
      });

      const urlencoded = new URLSearchParams();
      urlencoded.append("text", inputText /* && newComment.text */);
      console.log("newComment", newComment.text);
      console.log("newComment.text", newComment.text);

      const requestOptions2 = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:5000/api/plants/${_id}/comments`,
        requestOptions2
      );
      const result = await response.json();
      console.log(result);
      if (result.msg === "comment submitted") {
        setUpdatedComments(result.plant.comments);
        // setNewComment({});
        setInputText("");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  // useEffect(() => {
  //   if (plant) {
  //     const newSelectedPlant = plant.plantById[0];
  //     if (updatedComments) {
  //       // update the comments on the selected plant
  //       newSelectedPlant.comments = updatedComments;
  //     }
  //     setSelectedPlant(newSelectedPlant);
  //   }
  // }, [plant, updatedComments]);

  useEffect(() => {
    if (plant) {
      setSelectedPlant(plant.plantById[0]);
    }
  }, [plant]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : selectedPlant ? (
        <>
          <div className="container">
            {loggedinUser.email === selectedPlant.userEmail && (
              <>
                <Button variant="danger" onClick={() => setShowModal(true)}>
                  Delete Plant
                </Button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this plant?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeletePlant}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}

            <h1 className=" h1-pdp text-center"> {selectedPlant.name}</h1>
            <div className="product-img-container">
              <img
                className="container d-flex justify-content-center"
                src={selectedPlant.image}
                style={{ height: "30em", width: "auto" }}
              ></img>
            </div>
            <p>Author: {selectedPlant.userName}</p>
            <p>Description: {selectedPlant.description}</p>
            <h5>Germinating month: {selectedPlant.germinating_season} </h5>
            <h5>Harvest month: {selectedPlant.harvest} </h5>
            <div className=" align-items-baseline">
              {/* <Button variant="primary">Save Me</Button> */}
            </div>
          </div>

          <h2 className="text-center">
            {" "}
            Post a comment or a question for : {selectedPlant.name}
          </h2>
          <div className="comment-section container">
            {selectedPlant.comments &&
              selectedPlant.comments.map((comment, i) => {
                return (
                  <div className="comment text-center" /* key={i} */>
                    <p> Author: {comment.author}</p>
                    <img
                      src={comment.authorPicture}
                      alt="Avatar"
                      style={{
                        width: "100px",
                        borderRadius: "50%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    ></img>
                    <p> Comment: {comment.text}</p>
                  </div>
                );
              })}
            <div className="text-center input-comment">
              <input
                type="text"
                className="text-center"
                value={inputText}
                onChange={handleInputChange}
              />

              {loggedinUser ? (
                <button
                  className="comment-button"
                  onClick={() => handleComment()}
                >
                  Submit
                </button>
              ) : (
                <Link to="/login">
                  <button> login first</button>
                </Link>
              )}
            </div>
          </div>
          {/* <Comments id={product.id} /> */}
        </>
      ) : (
        <p>No plant found</p>
      )}
      {/* {error && <Navigate to="*" />} */}
      {error && <p>No plant with this id</p>}
    </div>
  );
}

export default Pdp;
