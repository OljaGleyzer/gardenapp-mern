import React, { useContext } from "react";
import PlantCard from "../components/PlantCard";
import { PlantsContext } from "../store/PlantsContext";

function Home() {
  const { plants, error, isLoading } = useContext(PlantsContext);
  console.log("Home data", plants);
  return (
    <>
      <h1>Welcome to your Garden App</h1>
      <h2>discover, communicate, plant</h2>
      <div className="g-4 row row-cols-md-4 row-cols-1 ">
        {plants &&
          plants.map((plant, index) => {
            return (
              <div key={plant._id}>
                <PlantCard plant={plant} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
