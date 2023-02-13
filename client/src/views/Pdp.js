import { Navigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";

function Pdp() {
  const { _id } = useParams();
  console.log("useParams()", useParams());
  const { plant, error, isLoading } = useFetch(_id); // add plant to pass it from useFetch but an array
  console.log("plant", plant);
  // const plantById = data && data.plantById ? data.plantById : [];
  // const plant = data.plantById.length > 0 ? data.plantById[0] : null; //plantbyId and data not deifined

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : plant ? (
        <>
          <div className="container">
            <h1 className="text-center"> {plant.plantByID}</h1>
            <div className="product-img-container">
              <img
                className="container d-flex justify-content-center"
                src={plant.image}
                style={{ height: "30em", width: "auto" }}
              ></img>
            </div>
            <p></p>
            <p>Description: {plant.description}</p>
            <h5>Germinating Season: {plant.germinating_season} €</h5>
            <h5>Harvest months: {plant.harvest} €</h5>
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
