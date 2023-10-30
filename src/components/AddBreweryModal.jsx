import React, { useState } from 'react';
import Modal from 'react-modal';

function AddBreweryModal({ isModalOpen, setModalOpen, userAddedBreweries, setUserAddedBreweries }) {
  const [breweryData, setBreweryData] = useState({
    name: '',
    brewery_type: '',
    address_1: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
    isUserAdded: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBreweryData({ ...breweryData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add the brewery to /breweries
    fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(breweryData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((newBrewery) => {
        // Add the new brewery to the userAddedBreweries state
        setUserAddedBreweries([...userAddedBreweries, newBrewery]);

        // Close the modal
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding brewery to /breweries:', error);
      });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Add Brewery Form"
    >
      <div className="modal-header">
    <h2 className="breweryModal">Add a Brewery</h2>
    <button className="exit-button" onClick={() => setModalOpen(false)}>
      X
    </button>
  </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={breweryData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="brewery_type"
          placeholder="Brewery Type"
          value={breweryData.brewery_type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address_1"
          placeholder="Address"
          value={breweryData.address_1}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={breweryData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state_province"
          placeholder="State/Province"
          value={breweryData.state_province}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={breweryData.postal_code}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={breweryData.country}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default AddBreweryModal;