import React, { useState, useEffect } from "react";

const CommodityIndex: React.FC = () => {
  const [alldata, setAlldata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commodityEndpoints = [
          "/api/alphavantage/sugar",
          "/api/alphavantage/coffee",
          "/api/alphavantage/copper",
          "/api/alphavantage/wheat",
          "/api/alphavantage/aluminium",
          "/api/alphavantage/corn",
        ];

        // Fetch all commodity data concurrently
        const responses = await Promise.all(
          commodityEndpoints.map((endpoint) => fetch(endpoint))
        );

        // Check if all responses are OK
        const dataPromises = responses.map(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });

        // Wait for all data to be fetched
        const data = await Promise.all(dataPromises);

        // Flatten the data into a single array
        setAlldata(data);
      } catch (err) {
        setError("Failed to fetch commodity data");
        console.error(err); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return "Loading...";
  if (error) return `${error}`;

  return JSON.stringify(alldata, null, 2);
};

export default CommodityIndex;
