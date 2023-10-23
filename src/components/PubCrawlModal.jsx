import React, { useState } from 'react';
import Modal from 'react-modal';

const PubCrawlModal = ({ isOpen, onRequestClose, onSavePubCrawl }) => {
  const [pubCrawlData, setPubCrawlData] = useState({
    name: '',
    description: '',
    legs: [],
  });

  const [currentLeg, setCurrentLeg] = useState(1);

  const handleNameChange = (event) => {
    setPubCrawlData({ ...pubCrawlData, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setPubCrawlData({ ...pubCrawlData, description: event.target.value });
  };

  const handleAddLeg = () => {
    const newLeg = {
      legName: `Leg ${currentLeg}`,
      breweryId: '', // Initialize with an empty brewery ID
    };
    setPubCrawlData({ ...pubCrawlData, legs: [...pubCrawlData.legs, newLeg] });
    setCurrentLeg(currentLeg + 1);
  };

  const handleBrewerySelection = (legIndex, breweryId) => {
    const updatedLegs = [...pubCrawlData.legs];
    updatedLegs[legIndex].breweryId = breweryId;
    setPubCrawlData({ ...pubCrawlData, legs: updatedLegs });
  };

  const handleSavePubCrawl = () => {
    // Validate and save the Pub Crawl data
    onSavePubCrawl(pubCrawlData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Pub Crawl Builder">
      <h2>Create a Pub Crawl</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={pubCrawlData.name}
        onChange={handleNameChange}
        placeholder="Enter a name"
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={pubCrawlData.description}
        onChange={handleDescriptionChange}
        placeholder="Enter a description"
      />
      <button onClick={handleAddLeg}>Add Leg</button>
      {pubCrawlData.legs.map((leg, index) => (
        <div key={index}>
          <p>{leg.legName}</p>
          <label>Select a Brewery:</label>
          {/* Here you can display a list of breweries to choose from */}
          <select
            value={leg.breweryId}
            onChange={(e) => handleBrewerySelection(index, e.target.value)}
          >
            <option value="">Select a Brewery</option>
            {/* Render options for breweries here */}
          </select>
        </div>
      ))}
      <button onClick={handleSavePubCrawl}>Save Pub Crawl</button>
    </Modal>
  );
};

export default PubCrawlModal;