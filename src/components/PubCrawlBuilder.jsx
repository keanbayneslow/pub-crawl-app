import React, { useState, useEffect } from 'react';
import PubCrawlModal from './PubCrawlModal';
import EditPubCrawlModal from './EditPubCrawlModal';
import '../styles/Breweries.css';

const PubCrawlBuilder = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage the "Create New Pub Crawl" modal
  const [pubCrawlName, setPubCrawlName] = useState(''); // State to store the pub crawl's name
  const [pubCrawlDescription, setPubCrawlDescription] = useState(''); // State to store the pub crawl's description
  const [pubCrawlData, setPubCrawlData] = useState({
    name: '',
    description: '',
    legs: [],
  });
  const [breweries, setBreweries] = useState([]); // State to store breweries
  const [pubCrawls, setPubCrawls] = useState([]); // State to store pub crawls
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for the "Edit Pub Crawl" modal
  const [editPubCrawl, setEditPubCrawl] = useState(null); // State to store the pub crawl being edited
  const [setSelectedLeg] = useState(null);
  const [refreshCrawls, setRefreshCrawls] = useState(false); // State to trigger refreshing the pub crawls list

  // Function to refresh the list of pub crawls
  const refreshParentComponent = () => {
    // Fetch the list of pub crawls immediately and then set the state to trigger a re-render
    fetchPubCrawls().then(() => {
      setRefreshCrawls(true);
    });
  };

  useEffect(() => {
    // Fetch the list of breweries and pub crawls when the component mounts or when refreshCrawls state changes
    fetchBreweries();
    fetchPubCrawls();
  }, [refreshCrawls]);

  const fetchBreweries = async () => {
    // Fetch the list of breweries from the server
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
    // Fetch the list of pub crawls from the server
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
    // Update the selected brewery for a specific leg
    setPubCrawlData((prevData) => {
      const updatedLegs = [...prevData.legs];
      updatedLegs[legIndex].breweryId = breweryId;
      return {
        legs: updatedLegs,
      };
    });
  };

  const getBreweryNameById = (breweryId) => {
    // Get the name of a brewery by its ID
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
        setEditModalOpen(false); // Close the "Edit Pub Crawl" modal
      })
      .catch((error) => {
        console.error('Error editing pub crawl:', error);
      });
    setRefreshCrawls(true);
  };

  const handleDeleteLeg = (pubCrawl, legIndex) => {
    // Delete a leg from a pub crawl
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
    // Open the "Edit Pub Crawl" modal with the selected pub crawl's data
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
    onSaveSuccess={refreshParentComponent}
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