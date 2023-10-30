import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/Breweries.css';

const EditPubCrawlModal = ({ isOpen, onRequestClose, pubCrawl, onSaveEdit, onDeletePubCrawl, onDeleteLeg, breweries, onBrewerySelection, }) => {

  const [editedPubCrawl, setEditedPubCrawl] = useState({ ...pubCrawl });

  // Ensure the editedPubCrawl is updated whenever the pubCrawl prop changes
  useEffect(() => {
    setEditedPubCrawl({ ...pubCrawl });
  }, [pubCrawl]);

  const handleNameChange = (event) => {
    setEditedPubCrawl({ ...editedPubCrawl, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setEditedPubCrawl({ ...editedPubCrawl, description: event.target.value });
  };

  const handleLegChange = (legIndex, breweryId) => {
    // Update the selected brewery for the given leg
    const updatedLegs = [...editedPubCrawl.legs];
    updatedLegs[legIndex].breweryId = breweryId;
    setEditedPubCrawl({ ...editedPubCrawl, legs: updatedLegs });
  };

  const handleAddLeg = () => {
    // Add a new leg to the PubCrawl
    const newLeg = {
      legName: `Leg ${editedPubCrawl.legs.length + 1}`,
      breweryId: '', // Initialise as an empty string
    };
    setEditedPubCrawl({ ...editedPubCrawl, legs: [...editedPubCrawl.legs, newLeg] });
  };

  const handleSaveEdit = () => {
    onSaveEdit(editedPubCrawl);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Pub Crawl">
      <div className="modal-header">
    <h2 className="breweryModal">Add a Brewery</h2>
    <button className="exit-button" onClick={onRequestClose}>
      X
    </button>
  </div>
      <label className="pubCrawlModal" htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={editedPubCrawl.name}
        onChange={handleNameChange}
        placeholder="Enter a name for your Pub Crawl"
      />
      <label className="pubCrawlModal" htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={editedPubCrawl.description}
        onChange={handleDescriptionChange}
        placeholder="Give your Pub Crawl a description"
      />
      <h3>Legs:</h3>
      {editedPubCrawl.legs.map((leg, legIndex) => (
        <div key={legIndex}>
          <label className="pubCrawlModal" htmlFor={`leg${legIndex}`}>Leg {legIndex + 1}:</label>
          <select
            id={`leg${legIndex}`}
            value={leg.breweryId}
            onChange={(e) => handleLegChange(legIndex, e.target.value)}
          >
            <option value="">Select a Brewery</option>
            {breweries.map((brewery) => (
              <option key={brewery.id} value={brewery.id}>
                {brewery.name}
              </option>
            ))}
          </select>
          <button className="edit-button" onClick={() => onDeleteLeg(editedPubCrawl, legIndex)}>Delete Leg</button>
        </div>
      ))}
      <button className="edit-button" onClick={handleAddLeg}>Add Leg</button>
      <button className="edit-button" onClick={handleSaveEdit}>Save Edit</button>
    </Modal>
  );
};

export default EditPubCrawlModal;