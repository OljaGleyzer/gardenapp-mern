import { createContext } from "react";
import useFetch from "../hooks/useFetch";

export const PlantsContext = createContext();

export const PlantsContextProvider = (props) => {
  console.log("plants context run");
  const { plants, error, isLoading, setPlants } = useFetch();

  console.log(
    "CONTEXT:plants, error, isLoading :>> ",
    plants,
    error,
    isLoading
  );
  return (
    <PlantsContext.Provider value={{ plants, error, isLoading }}>
      {props.children}
    </PlantsContext.Provider>
  );
};
