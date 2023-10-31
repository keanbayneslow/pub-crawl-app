import React, { useState, useEffect } from 'react';
import AddBreweryModal from './AddBreweryModal'; // Import the AddBreweryModal component
import EditBreweryModal from './EditBreweryModal'; // Import the EditBreweryModal component
import '../styles/Breweries.css';

const AddBreweriesForm = ({ onBreweryAdded }) => {
  const [userAddedBreweries, setUserAddedBreweries] = useState([]); // State for user-added breweries
  const [isModalOpen, setModalOpen] = useState(false); // State to control the AddBreweryModal
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State to control the EditBreweryModal
  const [breweryToEdit, setBreweryToEdit] = useState(null); // State to store the brewery being edited
  const [isLoading, setIsLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    fetchUserAddedBreweries();
    refreshUserAddedBreweries();
  }, []);

  // Function to fetch user-added breweries from the server
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

  // Function to handle editing a brewery
  const handleEdit = (brewery) => {
    setBreweryToEdit(brewery);
    setEditModalOpen(true);
  };

  // Function to handle deleting a brewery
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

  // Function to handle updating a brewery
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

  // Function to refresh the list of user-added breweries
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