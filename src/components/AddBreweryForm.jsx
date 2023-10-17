import React, { useState, useEffect } from 'react';
import BreweryModal from './BreweryModal'; 
import '../styles/AddBreweryForm.css';

const AddBreweriesForm = ({ onBreweryAdded }) => {
  const [userAddedBreweries, setUserAddedBreweries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedBreweries = JSON.parse(localStorage.getItem('userAddedBreweries')) || [];
    setUserAddedBreweries(savedBreweries);
  }, []);

  // Save data to local storage when userAddedBreweries changes
  useEffect(() => {
    localStorage.setItem('userAddedBreweries', JSON.stringify(userAddedBreweries));
  }, [userAddedBreweries]);

  const handleDelete = (breweryId) => {
    // Send a DELETE request to remove the brewery
    fetch(`http://localhost:3001/breweries/${breweryId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the deleted brewery from userAddedBreweries
        setUserAddedBreweries(userAddedBreweries.filter((brewery) => brewery.id !== breweryId));
      })
      .catch((error) => {
        console.error('Error deleting brewery:', error);
      });
  };

  return (
    <div>
      <h2>Add a Brewery</h2>
      <button onClick={() => setModalOpen(true)}>Add Brewery</button>
      <BreweryModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        userAddedBreweries={userAddedBreweries}
        setUserAddedBreweries={setUserAddedBreweries}
      />

      <div>
        <h3>Added Breweries</h3>
        <ul>
          {userAddedBreweries.map((brewery) => (
            <li key={brewery.id}>
              {brewery.name} ({brewery.country})
              <button onClick={() => handleDelete(brewery.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddBreweriesForm;