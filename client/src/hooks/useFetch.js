import { useEffect, useState } from "react";

function useFetch() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:5000/api/plants/all";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        console.log("respones", response);
        const data = await response.json();
        console.log("data", data);
        setPlants(data);
      } catch (err) {
        console.log("error :>> ", error);
        setError(err);
      }
    }
    fetchData();
  }, []);

  return { plants, error, isLoading, setPlants };
}

export default useFetch;
