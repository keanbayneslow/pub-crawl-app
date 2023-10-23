import React, { useState } from 'react';
import PubCrawlModal from './PubCrawlModal';

const PubCrawlBuilder = () => {
const [isModalOpen, setModalOpen] = useState(false);
const [pubCrawlName, setPubCrawlName] = useState('');
const [pubCrawlDescription, setPubCrawlDescription] = useState('');
const [legs, setLegs] = useState([]);
const [pubCrawls, setPubCrawls] = useState([]); // State to store saved pub crawls

const handleSavePubCrawl = () => {
    // Create a new PubCrawl object with name, description, and legs
    const newPubCrawl = {
    name: pubCrawlName,
    description: pubCrawlDescription,
    legs: legs,
    };

    // Send a POST request to save the new pub crawl
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
        // Save the new pub crawl to state (pubCrawls)
        setPubCrawls([...pubCrawls, savedPubCrawl]);

        // Close the modal and reset form fields
        setModalOpen(false);
        setPubCrawlName('');
        setPubCrawlDescription('');
        setLegs([]);
    })
    .catch((error) => {
        console.error('Error saving pub crawl:', error);
    });
};

const handleAddLeg = () => {
    // Add a new leg to the PubCrawl
    setLegs([...legs, {}]);
};

return (
    <div>
    <button onClick={() => setModalOpen(true)}>Create New Pub Crawl</button>
    {isModalOpen && (
        <PubCrawlModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        pubCrawlName={pubCrawlName}
        setPubCrawlName={setPubCrawlName}
        pubCrawlDescription={pubCrawlDescription}
        setPubCrawlDescription={setPubCrawlDescription}
        legs={legs}
        setLegs={setLegs}
        onSavePubCrawl={handleSavePubCrawl}
        />
    )}

    {pubCrawls.map((pubCrawl, index) => (
        <div key={index}>
        <h3>{pubCrawl.name}</h3>
        <p>{pubCrawl.description}</p>
          {/* Render legs for this pub crawl */}
        {pubCrawl.legs.map((leg, legIndex) => (
            <div key={legIndex}>
            <h4>Leg {legIndex + 1}</h4>
            </div>
        ))}
        </div>
    ))}

    <button onClick={handleAddLeg}>Add Leg</button>
    </div>
);
};

export default PubCrawlBuilder;