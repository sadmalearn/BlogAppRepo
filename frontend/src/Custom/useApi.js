// hooks/useApi.js
import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
      console.error("API Error:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApi;
