import React, { useState, useEffect } from 'react';
import '../styles/Breweries.css';

const Favourites = () => {
  // State to store the favorite breweries
  const [favouriteBreweries, setFavouriteBreweries] = useState([]);

  useEffect(() => {
    // Fetch favorite breweries when the component is mounted
    fetch('https://pub-crawl-backend-g8ks.onrender.com/favourites')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set the favorite breweries when data is fetched successfully
        setFavouriteBreweries(data);
      })
      .catch((error) => {
        console.error('Error fetching favourites:', error);
      });
  }, []);

  // Function to handle the deletion of a favorite brewery by ID
  const handleDelete = (id) => {
    // Send a DELETE request to remove the brewery with the specified ID
    fetch(`https://pub-crawl-backend-g8ks.onrender.com/favourites/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // After successful deletion, refresh the list of favourite breweries
        return fetch('https://pub-crawl-backend-g8ks.onrender.com/favourites');
      })
      .then((response) => response.json())
      .then((data) => {
        // Set the updated list of favorite breweries
        setFavouriteBreweries(data);
      })
      .catch((error) => {
        console.error('Error deleting favourite:', error);
      });
  };

  return (
    <div className="breweries-list">
      <h1>Favourite Breweries</h1>
      <ul className="breweries">
        {favouriteBreweries.map((brewery) => (
          <li key={brewery.id} className="brewery">
            <h2>{brewery.name}</h2>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1}</p>
            <p>City: {brewery.city}</p>
            <p>State: {brewery.state_province}</p>
            <p>Postal Code: {brewery.postal_code}</p>
            <p>Country: {brewery.country}</p>
            <button onClick={() => handleDelete(brewery.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;