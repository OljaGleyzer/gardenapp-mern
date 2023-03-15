import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function PlantCard({ plant }) {
  const { name, description, image, harvest, germinating_season } = plant;
  // console.log("product", product);
  const redirectTo = useNavigate();
  return (
    <>
      <Card
        style={{ height: "fit-content", overflow: "hidden" }}
        className="col"
      >
        <div className=" cardlist-card ">
          <Card.Img
            style={{ aspectRatio: "2/2", width: "100%", objectFit: "cover" }}
            variant="top"
            src={image}
            className="card-img-top"
          />
          <Card.Body className="">
            <Card.Title>{name}</Card.Title>
            <div className=" card-text">
              {/* <Card.Text className=" text-wrap ">{description}</Card.Text> */}

              <Card.Text className=" text-wrap ">
                {" "}
                Germination:
                {germinating_season}
                <br />
                Harvest: {harvest}
              </Card.Text>
              {/* <Card.Text className=" text-wrap ">
                Harvest Month: {harvest} */}
              {/* </Card.Text> */}
              <br />
            </div>
            <div className="container d-flex align-items-baseline">
              <Button
                variant="primary"
                className="btn btn-primary custom-button"
                onClick={() => redirectTo(`/plants/${plant._id}`)}
              >
                Show More{" "}
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export default PlantCard;
