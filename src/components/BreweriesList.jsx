import React, { useState, useEffect } from 'react';
import '../styles/Breweries.css';

const BreweriesList = () => {
  // State variables to manage data and loading status
  const [breweries, setBreweries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [favouriteBreweries, setFavouriteBreweries] = useState([]);
  const [addedToFavourites, setAddedToFavourites] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Function to add a brewery to the user's favorites
  const addBreweryToFavourites = (brewery) => {
    setFavouriteBreweries([...favouriteBreweries, brewery]);
    setAddedToFavourites({ ...addedToFavourites, [brewery.id]: true });

    // Send a POST request to add the brewery to favourites on the server
    fetch('https://pub-crawl-backend-g8ks.onrender.com/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brewery),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error adding brewery:', error);
      });
  };

  // Fetch brewery data when the component mounts
  useEffect(() => {
    console.log('Fetching data...');
    fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBreweries(data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set isLoading to false on error
      });
  }, []);

  // Function to remove a brewery from favorites
  const deleteBreweryFromFavourites = (breweryId) => {
    setFavouriteBreweries(favouriteBreweries.filter((brewery) => brewery.id !== breweryId));
    setAddedToFavourites({ ...addedToFavourites, [breweryId]: false });

    // Send a DELETE request to remove the brewery from favourites on the server
    fetch(`https://pub-crawl-backend-g8ks.onrender.com/favourites/${breweryId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting brewery:', error);
      });
  };

  // Fetch the brewery data again when the component mounts
  useEffect(() => {
    console.log('Fetching data...');
    fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries')
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

  // Function to handle country selection
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Filter breweries based on the selected country
  const filteredBreweries = selectedCountry
    ? breweries.filter((brewery) => brewery.country === selectedCountry)
    : breweries;

  return (
    <div className="breweries-list">
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
      {isLoading ? (
        <h2>Loading...</h2> 
      ) : (
      <ul className="breweries">
        {filteredBreweries.map((brewery) => (
          <li
            key={brewery.id}
            className={`brewery ${favouriteBreweries.includes(brewery) ? 'favourite' : ''}`}
          >
            <h2>{brewery.name}</h2>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1}</p>
            <p>City: {brewery.city}</p>
            <p>State: {brewery.state_province}</p>
            <p>Postal Code: {brewery.postal_code}</p>
            <p>Country: {brewery.country}</p>
            <button
              onClick={() => {
                addBreweryToFavourites(brewery);
              }}
            >
              Add to Favourites
            </button>
            {addedToFavourites[brewery.id] && (
              <button
                onClick={() => {
                  deleteBreweryFromFavourites(brewery.id);
                }}
              >
                Remove from Favourites
              </button>
            )}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BreweriesList;













