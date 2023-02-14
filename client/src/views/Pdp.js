import { Navigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

function Pdp() {
  const { _id } = useParams();
  console.log("useParams()", useParams());
  const { plant, error, isLoading } = useFetch(_id); // add plant to pass it from useFetch but an array
  console.log("plant", plant);
  const [selectedPlant, setSelectedPlant] = useState(null);

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
            <h1 className="text-center"> {selectedPlant.name}</h1>
            <div className="product-img-container">
              <img
                className="container d-flex justify-content-center"
                src={selectedPlant.image}
                style={{ height: "30em", width: "auto" }}
              ></img>
            </div>
            <p></p>
            <p>Description: {selectedPlant.description}</p>
            <h5>Germinating Season: {selectedPlant.germinating_season} €</h5>
            <h5>Harvest months: {selectedPlant.harvest} €</h5>
            <div className=" align-items-baseline">
              <Button variant="primary">Save Me</Button>
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
