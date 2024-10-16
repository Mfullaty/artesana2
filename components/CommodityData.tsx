import React, { useEffect, useState } from 'react';

interface country {
    country: string
}
const CommodityData = ({ country} : country) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`api/commodity?country=${country}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error.message));
  }, [country]);

  console.log(data);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          <h2>Commodity Data for {country}</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CommodityData;
