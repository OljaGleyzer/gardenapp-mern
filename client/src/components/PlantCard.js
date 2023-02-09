import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";

function PlantCard({ plant }) {
  const { name, description, image } = plant;
  // console.log("product", product);
  return (
    <>
      <Card style={{ height: "30em", overflow: "auto" }} className="col">
        <div className=" cardlist-card ">
          <Card.Img
            style={{ height: "15em", width: "auto" }}
            variant="top"
            src={image}
            className="card-img-top"
          />
          <Card.Body className="text-overflow justify-content-end">
            <Card.Title>{name}</Card.Title>
            <Card.Text className="card-text">{description}</Card.Text>
            {/* <Link to={"/"+plant._id}> */}
            <div className="container d-flex align-items-baseline">
              <Button variant="primary" className="btn btn-primary">
                Show More{" "}
              </Button>
            </div>
            {/* </Link> */}
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export default PlantCard;
