import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(
            `https://pub-crawl-backend-g8ks.onrender.com//breweries?search=${searchTerm}`
          );
          if (response.ok) {
            const data = await response.json();
            setBreweries(data);
          }
        }
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
          <li
            key={brewery.id}
            onClick={() => setSearchTerm(brewery.name)}
          >
            {brewery.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;