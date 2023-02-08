import React, { useContext } from "react";
import { PlantsContext } from "../store/PlantsContext";

function Home() {
  const { plants, error, isLoading } = useContext(PlantsContext);
  return (
    <>
      <h1>Welcome to your Garden App</h1>
      <h2>discover, communicate, plant</h2>
      <p></p>
    </>
  );
}

export default Home;
