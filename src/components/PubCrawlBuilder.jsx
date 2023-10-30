import React, { useState, useEffect } from 'react';
import PubCrawlModal from './PubCrawlModal';
import EditPubCrawlModal from './EditPubCrawlModal';
import '../styles/Breweries.css';

const PubCrawlBuilder = () => {
const [isModalOpen, setModalOpen] = useState(false);
const [pubCrawlName, setPubCrawlName] = useState('');
const [pubCrawlDescription, setPubCrawlDescription] = useState('');
const [pubCrawlData, setPubCrawlData] = useState({
    name: '',
    description: '',
    legs: [],
});
  const [breweries, setBreweries] = useState([]); // State to store breweries
  const [pubCrawls, setPubCrawls] = useState([]); // State to store pub crawls
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [editPubCrawl, setEditPubCrawl] = useState(null); // State to store the pub crawl being edited
  const [selectedLeg, setSelectedLeg] = useState(null);

  useEffect(() => {
    // Fetch the list of breweries when the component mounts
    fetchBreweries();
    // Fetch the list of pub crawls when the component mounts
    fetchPubCrawls();
  }, []);

  const fetchBreweries = async () => {
    try {
      const response = await fetch('https://pub-crawl-backend-g8ks.onrender.com/breweries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBreweries(data);
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
  };

  const fetchPubCrawls = async () => {
    try {
      const response = await fetch('https://pub-crawl-backend-g8ks.onrender.com/pubCrawl');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPubCrawls(data);
    } catch (error) {
      console.error('Error fetching pub crawls:', error);
    }
  };

const handleSavePubCrawl = () => {
    // Create a new PubCrawl object with name, description, and legs
    const newPubCrawl = {
    name: pubCrawlName,
    description: pubCrawlDescription,
    legs: pubCrawlData.legs,
    };

    // Send a POST request to save the new pub crawl to your API
    fetch('https://pub-crawl-backend-g8ks.onrender.com/pubCrawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPubCrawl),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((savedPubCrawl) => {
        // Close the modal and reset form fields
        setModalOpen(false);
        setPubCrawlName('');
        setPubCrawlDescription('');
        setPubCrawlData({ legs: [] });
        // Fetch the updated list of pub crawls
        fetchPubCrawls();
      })
      .catch((error) => {
        console.error('Error saving pub crawl:', error);
      });
  };

const handleAddLeg = () => {
    // Add a new leg to the PubCrawl
    setPubCrawlData((prevData) => ({
    legs: [
        ...prevData.legs,
        {
        legName: `Leg ${prevData.legs.length + 1}`,
        breweryId: '', // Initialise as an empty string
        },
    ],
    }));
};

const handleBrewerySelection = (legIndex, breweryId) => {
    setPubCrawlData((prevData) => {
    const updatedLegs = [...prevData.legs];
    updatedLegs[legIndex].breweryId = breweryId;
    return {
        legs: updatedLegs,
    };
    });
};

const getBreweryNameById = (breweryId) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.name : 'Brewery not found';
  };

  const handleDeletePubCrawl = (pubCrawlId) => {
    // Send a DELETE request to remove the pub crawl by ID
    fetch(`https://pub-crawl-backend-g8ks.onrender.com/pubCrawl/${pubCrawlId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated list of pub crawls after deletion
        return fetchPubCrawls();
      })
      .catch((error) => {
        console.error('Error deleting pub crawl:', error);
      });
  };

  const handleEditPubCrawl = (editedPubCrawl) => {
    // Send a PATCH request to update the edited pub crawl by ID
    fetch(`https://pub-crawl-backend-g8ks.onrender.com/pubCrawl/${editedPubCrawl.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPubCrawl),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated list of pub crawls after editing
        return fetchPubCrawls();
      })
      .then(() => {
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Error editing pub crawl:', error);
      });
  };
  const handleEditLeg = (pubCrawl, legIndex) => {
    // Set the selected leg for editing
    setSelectedLeg({ pubCrawl, legIndex });
  };
  
  const handleDeleteLeg = (pubCrawl, legIndex) => {
    // Remove the selected leg from the pub crawl
    const updatedPubCrawl = { ...pubCrawl };
    updatedPubCrawl.legs.splice(legIndex, 1);
  
    // Send a PATCH request to update the pub crawl with the removed leg
    fetch(`https://pub-crawl-backend-g8ks.onrender.com/pubCrawl/${pubCrawl.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPubCrawl),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated list of pub crawls after editing
        return fetchPubCrawls();
      })
      .then(() => {
        // Close the edit leg modal if it's open
        setSelectedLeg(null);
      })
      .catch((error) => {
        console.error('Error deleting leg:', error);
      });
  };

const openEditModal = (pubCrawl) => {
    setEditPubCrawl(pubCrawl);
    setEditModalOpen(true);
};

return (
    <div className='breweries-list'>
  <h1>Your Pub Crawls</h1>
  <button onClick={() => setModalOpen(true)}>Create New Pub Crawl</button>
  <ul className="breweries">
    {pubCrawls.map((pubCrawl) => (
      <li key={pubCrawl.id} className="brewery">
        <h2>Name: {pubCrawl.name}</h2>
        <p>Description: {pubCrawl.description}</p>

        <ul>
          {pubCrawl.legs.map((leg, legIndex) => (
            <li key={legIndex} className="brewery-leg">
              <h3>{leg.legName}</h3>
              <p>Brewery Name: {getBreweryNameById(leg.breweryId)}</p>
            </li>
          ))}
        </ul>
        <button className="edit-button" onClick={() => handleDeletePubCrawl(pubCrawl.id)}>Delete Pub Crawl</button>
        <button className="edit-button" onClick={() => openEditModal(pubCrawl)}>Edit Pub Crawl</button>
      </li>
    ))}
  </ul>

  {isModalOpen && (
    <PubCrawlModal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      pubCrawlName={pubCrawlName}
      setPubCrawlName={setPubCrawlName}
      pubCrawlDescription={pubCrawlDescription}
      setPubCrawlDescription={setPubCrawlDescription}
      legs={pubCrawlData.legs}
      onSavePubCrawl={handleSavePubCrawl}
      breweries={breweries}
      onAddLeg={handleAddLeg}
      onBrewerySelection={handleBrewerySelection}
    />
  )}
  {isEditModalOpen && (
    <EditPubCrawlModal
      isOpen={isEditModalOpen}
      onRequestClose={() => setEditModalOpen(false)}
      pubCrawl={editPubCrawl}
      onSaveEdit={handleEditPubCrawl}
      onDeletePubCrawl={handleDeletePubCrawl} // Pass delete functions
      onDeleteLeg={handleDeleteLeg} // Pass delete functions
      breweries={breweries}
      onBrewerySelection={handleBrewerySelection}
    />
  )}
</div>
);
};

export default PubCrawlBuilder;