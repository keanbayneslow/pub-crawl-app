import React, { useState, useEffect } from "react";

const SearchBar = () => {
  // State to store breweries and the search term
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Use an effect to fetch breweries when the search term changes
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        if (searchTerm) {
           // Send a GET request to fetch breweries matching the search term
          const response = await fetch(
            `https://pub-crawl-backend-g8ks.onrender.com//breweries?search=${searchTerm}`
          );
          if (response.ok) {
            // If the response is successful, parse it as JSON
            const data = await response.json();
            setBreweries(data); // Update the breweries state with the search results
          }
        }
      } catch (error) {
        console.error("Error fetching breweries:", error);
      }
    };

    // Call the fetchBreweries function when the search term changes
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