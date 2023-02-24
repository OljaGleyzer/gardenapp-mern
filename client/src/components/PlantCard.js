import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PlantCard({ plant }) {
  const { name, description, image, harvest, germinating_season } = plant;
  // console.log("product", product);
  return (
    <>
      <Card style={{ height: "30em", overflow: "hidden" }} className="col">
        <div className=" cardlist-card ">
          <Card.Img
            style={{ height: "15em", width: "auto" }}
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
                Germinating Month:
                {germinating_season}
              </Card.Text>
              <Card.Text className=" text-wrap ">
                Harvest Month: {harvest}
              </Card.Text>
            </div>
            <Link to={`/plants/${plant._id}`}>
              <div className="container d-flex align-items-baseline">
                <Button
                  variant="primary"
                  className="btn btn-primary custom-button"
                >
                  Show More{" "}
                </Button>
              </div>
            </Link>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export default PlantCard;
