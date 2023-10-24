import React, { useState } from 'react';
import Modal from 'react-modal';

function EditBreweryModal({ isOpen, onRequestClose, brewery, onUpdateBrewery }) {
  const [breweryData, setBreweryData] = useState(brewery || {}); // Initialize with an empty object if brewery is null

const handleChange = (event) => {
    const { name, value } = event.target;
    setBreweryData({ ...breweryData, [name]: value });
};

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a PATCH request to update the brewery
    const response = await fetch(`https://pub-crawl-backend-g8ks.onrender.com/breweries/${brewery.id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        ...brewery,
        ...breweryData,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

      // Close the modal
    onRequestClose();

    window.location.reload();


    } catch (error) {
    console.error('Error updating brewery:', error);
    }
};

return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Edit Brewery Form"
    >
    <h2>Edit Brewery</h2>
    <form>
        <input
        type="text"
        name="name"
        placeholder="Name"
        value={breweryData.name || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="brewery_type"
        placeholder="Brewery Type"
        value={breweryData.brewery_type || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="address_1"
        placeholder="Address"
        value={breweryData.address_1 || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="city"
        placeholder="City"
        value={breweryData.city || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="state_province"
        placeholder="State"
        value={breweryData.state_province || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="postal_code"
        placeholder="Postal Code"
        value={breweryData.postal_code || ''}
        onChange={handleChange}
        />
        <input
        type="text"
        name="country"
        placeholder="Country"
        value={breweryData.country || ''}
        onChange={handleChange}
        />
    
        <button onClick={handleSubmit}>Update</button>
    </form>
    </Modal>
);
}

export default EditBreweryModal;