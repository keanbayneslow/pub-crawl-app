import React, { useState } from 'react';
import '../styles/AddBreweryForm.css'

const AddBreweriesForm = ({ onBreweryAdded }) => {
  const [breweryData, setBreweryData] = useState({
    name: '',
    brewery_type: '',
    address_1: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBreweryData({ ...breweryData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to the server to add the new brewery
    fetch('http://localhost:3001/breweries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(breweryData),
    })
      .then((newBrewery) => {
  newBrewery.isUserAdded = true; // Mark the brewery as user-added
  onBreweryAdded(newBrewery);
  setBreweryData({
    name: '',
    brewery_type: '',
    address_1: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
  });
})
      .catch((error) => {
        console.error('Error adding brewery:', error);
      });
  };

  return (
    <div>
      <h2>Add a Brewery</h2>
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
      
    </div>
    
  );
};

export default AddBreweriesForm;