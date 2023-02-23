import React, { useContext, useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import { PlantsContext } from "../store/PlantsContext";

function Home() {
  const [harvestMonth, setHarvestMonth] = useState("");
  const [germinationMonth, setGerminationMonth] = useState("");

  const { plants, plant, error, isLoading } = useContext(PlantsContext);
  console.log("Home data", plants);

  // Filter plants by harvest and germination months
  const filteredPlants = plants.filter((plant) => {
    if (harvestMonth && plant.harvest !== harvestMonth) {
      return false;
    }
    if (germinationMonth && plant.germinating_season !== germinationMonth) {
      return false;
    }
    return true;
  });

  // Generate options for harvest and germination months
  const harvestMonthOptions = [
    ...new Set(plants.map((plant) => plant.harvest)),
  ];
  const germinationMonthOptions = [
    ...new Set(plants.map((plant) => plant.germinating_season)),
  ];

  return (
    <div className="home-page">
      <div className="container ">
        <h1 className="text-center">Welcome to your Garden App</h1>
        <h2 className="text-center">discover, communicate, plant</h2>
        <br />
        <div className="row g-3">
          <div className="col-auto">
            <label
              htmlFor="harvest-month-select"
              className="form-label"
              style={{ color: "white" }}
            >
              Harvest Month
            </label>
            <select
              id="harvest-month-select"
              className="form-select"
              value={harvestMonth}
              onChange={(e) => setHarvestMonth(e.target.value)}
            >
              <option value="">All</option>
              {harvestMonthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <label
              htmlFor="germination-month-select"
              className="form-label"
              style={{ color: "white" }}
            >
              Germination Month
            </label>
            <select
              id="germination-month-select"
              className="form-select"
              value={germinationMonth}
              onChange={(e) => setGerminationMonth(e.target.value)}
            >
              <option value="">All</option>
              {germinationMonthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="g-4 row row-cols-md-4 row-cols-1 ">
          {plants &&
            filteredPlants.map((plant, index) => {
              return (
                <div key={plant._id}>
                  <PlantCard plant={plant} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
