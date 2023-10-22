import React, { useState } from 'react';
import Modal from 'react-modal';

const EditBreweryModal = ({ isOpen, onRequestClose, brewery, onUpdateBrewery }) => {
const [editedBrewery, setEditedBrewery] = useState({ ...brewery });

const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedBrewery({ ...editedBrewery, [name]: value });
};

const handleSubmit = () => {
    // Handle the update of the editedBrewery
    onUpdateBrewery(editedBrewery);
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
        value={editedBrewery.name}
        onChange={handleChange}
        />
        <input
        type="text"
        name="brewery_type"
        placeholder="Brewery Type"
        value={editedBrewery.brewery_type}
        onChange={handleChange}
        />
        <input
        type="text"
        name="address_1"
        placeholder="Address"
        value={editedBrewery.address_1}
        onChange={handleChange}
        />
        <input
        type="text"
        name="city"
        placeholder="City"
        value={editedBrewery.city}
        onChange={handleChange}
        />
        <input
        type="text"
        name="state_province"
        placeholder="State"
        value={editedBrewery.state_province}
        onChange={handleChange}
        />
        <input
        type="text"
        name="postal_code"
        placeholder="Postal Code"
        value={editedBrewery.postal_code}
        onChange={handleChange}
        />
        <input
        type="text"
        name="country"
        placeholder="Country"
        value={editedBrewery.country}
        onChange={handleChange}
        />
    
        <button onClick={handleSubmit}>Update</button>
    </form>
    </Modal>
);
};

export default EditBreweryModal;