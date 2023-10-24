import React, { useState, useEffect } from 'react';
import PubCrawlModal from './PubCrawlModal';
import '../styles/BreweriesList.css';

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

  useEffect(() => {
    // Fetch the list of breweries when the component mounts
    fetchBreweries();
    // Fetch the list of pub crawls when the component mounts
    fetchPubCrawls();
  }, []);

  const fetchBreweries = async () => {
    try {
      const response = await fetch('http://localhost:3001/breweries');
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
      const response = await fetch('http://localhost:3001/pubCrawl');
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
    fetch('http://localhost:3001/pubCrawl', {
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
        breweryId: '', // Initialize as an empty string
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
  

return (
    <div className='brewery-list'>
        <h1>Your Pub Crawls</h1>
    <button onClick={() => setModalOpen(true)}>Create New Pub Crawl</button>
    <ul className="breweries">
      {pubCrawls.map((pubCrawl) => (
        <li key={pubCrawl.id} className="brewery">
          <h2>Name: {pubCrawl.name}</h2>
          <p>Description: {pubCrawl.description}</p>

          <ul>
            {pubCrawl.legs.map((leg, index) => (
              <li key={index} className="brewery-leg">
                <h3>{leg.legName}</h3>
                <p>Brewery Name: {getBreweryNameById(leg.breweryId)}</p>
              </li>
            ))}
          </ul>
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
        breweries={breweries} // Pass the breweries data to the modal
        onAddLeg={handleAddLeg}
        onBrewerySelection={handleBrewerySelection}
        />
    )}

    </div>
);
};

export default PubCrawlBuilder;