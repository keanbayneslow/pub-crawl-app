import React, { useState, useEffect } from 'react';

const BreweriesList = () => {
  const [breweries, setBreweries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(''); // Initialize with an empty string

  useEffect(() => {
    console.log("Fetching data...");
    fetch('http://localhost:3001/breweries')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBreweries(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Filter the breweries based on the selectedCountry
  const filteredBreweries = selectedCountry
    ? breweries.filter((brewery) => brewery.country === selectedCountry)
    : breweries;

  return (
    <div>
      <h1>Breweries List</h1>
      <label>
        Select a Country:
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">All</option>
          {Array.from(new Set(breweries.map((brewery) => brewery.country))).map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {filteredBreweries.map((brewery) => (
          <li key={brewery.id}>
            <h2>{brewery.name}</h2>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1}</p>
            <p>City: {brewery.city}</p>
            <p>State: {brewery.state_province}</p>
            <p>Postal Code: {brewery.postal_code}</p>
            <p>Country: {brewery.country}</p>
            <p>Phone: {brewery.phone}</p>
            {brewery.website_url && <a href={brewery.website_url}>Website</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweriesList;