import { useState, useEffect } from "react";

const useYoutubeApi = (url, apiKey) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}&key=${apiKey}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url, apiKey]);
  
  return { data, error };
};

export default useYoutubeApi;