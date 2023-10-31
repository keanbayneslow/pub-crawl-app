import React, { useState, useEffect } from 'react';
import AddBreweryModal from './AddBreweryModal';
import EditBreweryModal from './EditBreweryModal';
import '../styles/Breweries.css';

const AddBreweriesForm = ({ onBreweryAdded }) => {
  const [userAddedBreweries, setUserAddedBreweries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [breweryToEdit, setBreweryToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserAddedBreweries();
    refreshUserAddedBreweries();
  }, []);

  const fetchUserAddedBreweries = async () => {
    try {
      const response = await fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Filter only the user-added breweries
      const userAddedBreweries = data.filter((brewery) => brewery.isUserAdded);
      setUserAddedBreweries(userAddedBreweries);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user-added breweries:', error);
      setIsLoading(false);
    }
  };



  const handleEdit = (brewery) => {
    setBreweryToEdit(brewery);
    setEditModalOpen(true);
  };

  const handleDelete = async (breweryId) => {
    try {
      // Make a DELETE request to remove the brewery
      const response = await fetch(`https://pub-crawl-backend-g8ks.onrender.com/breweries/${breweryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted brewery from the userAddedBreweries state
      setUserAddedBreweries((prevBreweries) =>
        prevBreweries.filter((brewery) => brewery.id !== breweryId)
      );
    } catch (error) {
      console.error('Error deleting brewery:', error);
    }
  };

  const handleUpdateBrewery = async (updatedBrewery) => {
    try {
      // Make a PATCH request to update the brewery
      const response = await fetch(
        `https://pub-crawl-backend-g8ks.onrender.com/breweries/${updatedBrewery.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBrewery),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Close the edit modal
      setEditModalOpen(false);
  
      // Update the userAddedBreweries state with the latest data
      setUserAddedBreweries((prevBreweries) =>
        prevBreweries.map((brewery) =>
          brewery.id === updatedBrewery.id ? updatedBrewery : brewery
        )
      );
    } catch (error) {
      console.error('Error updating brewery:', error);
    }
  };

  const refreshUserAddedBreweries = async () => {
    try {
      const response = await fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const userAddedBreweries = data.filter((brewery) => brewery.isUserAdded);
      setUserAddedBreweries(userAddedBreweries);
    } catch (error) {
      console.error('Error fetching user-added breweries:', error);
    }
  };

  return (
    <div className="breweries-list">
      <h2 className="h1">Add a Brewery</h2>
      <button className="add-button" onClick={() => setModalOpen(true)}>
        Add Brewery
      </button>
      <AddBreweryModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        userAddedBreweries={userAddedBreweries}
        setUserAddedBreweries={setUserAddedBreweries}
      />
      <EditBreweryModal
  isOpen={isEditModalOpen}
  onRequestClose={() => setEditModalOpen(false)}
  brewery={breweryToEdit}
  onUpdateBrewery={handleUpdateBrewery}
  refreshParentComponent={refreshUserAddedBreweries}
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
                <button className="edit-button" onClick={() => handleEdit(brewery)}>
                  Edit
                </button>
                <button className="edit-button" onClick={() => handleDelete(brewery.id)}>
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