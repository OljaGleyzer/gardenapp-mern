import { useEffect, useState } from "react";

function useFetch(_id) {
  const [plant, setPlant] = useState(null);
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = _id
    ? `http://localhost:5000/api/plants/${_id}`
    : "http://localhost:5000/api/plants/all";

  useEffect(() => {
    async function fetchData(_id) {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        console.log("respones", response);
        const data = await response.json();
        // console.log("data.allPlants", data.allPlants);
        if (_id) {
          setPlant(data);
        } else {
          setPlants(data.allPlants);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error :>> ", error);
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData(_id);
  }, [_id]);

  return { plant, plants, error, isLoading, setPlants };
}

export default useFetch;
