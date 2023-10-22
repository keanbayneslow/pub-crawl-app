import React, { useState, useEffect } from 'react';
import BreweryModal from './BreweryModal';
import '../styles/BreweriesList.css';

const AddBreweriesForm = ({ onBreweryAdded }) => {
  const [userAddedBreweries, setUserAddedBreweries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator

  useEffect(() => {
    // Fetch user-added breweries from the server when the component mounts
    fetchUserAddedBreweries();
  }, []);

  const fetchUserAddedBreweries = async () => {
    try {
      const response = await fetch('http://localhost:3001/userAddedBreweries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserAddedBreweries(data);
      setIsLoading(false); // Data has been loaded
    } catch (error) {
      console.error('Error fetching user-added breweries:', error);
      setIsLoading(false); // Set loading to false on error
    }
  };

  const handleDelete = async (breweryId) => {
    // Add a confirmation dialog before deletion
    const confirmDeletion = window.confirm('Are you sure you want to delete this brewery?');
    if (!confirmDeletion) {
      return;
    }

    try {
      // Send a DELETE request to the server to remove the brewery
      const response = await fetch(`http://localhost:3001/userAddedBreweries/${breweryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Remove the deleted brewery from the userAddedBreweries state
      setUserAddedBreweries(userAddedBreweries.filter((brewery) => brewery.id !== breweryId));
    } catch (error) {
      console.error('Error deleting brewery:', error);
    }
  };

  return (
    <div className="breweries-list">
      <h2 className="h1">Add a Brewery</h2>
      <button className="add-button" onClick={() => setModalOpen(true)}>
        Add Brewery
      </button>
      <BreweryModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        userAddedBreweries={userAddedBreweries}
        setUserAddedBreweries={setUserAddedBreweries}
      />

      <div className="added-breweries">
        <h3 className="h1">Added Breweries</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="added-breweries-list">
            {userAddedBreweries.map((brewery) => (
              <li key={brewery.id} className="brewery">
                <p>
                  {brewery.name} ({brewery.country})
                </p>
                <p>{brewery.brewery_type}</p>
                <p>{brewery.address_1}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(brewery.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddBreweriesForm;