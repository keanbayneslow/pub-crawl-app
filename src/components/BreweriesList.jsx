import React, { useState, useEffect } from "react";

const BreweriesList = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch breweries");
        }

        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error("Error fetching breweries:", error);
      }
    };

    fetchBreweries();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Breweries</h1>
      <input
        type="text"
        placeholder="Search for breweries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>{brewery.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BreweriesList;