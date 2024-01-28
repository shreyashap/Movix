import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(url)
      .then((res) => {
        if (res) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
