// Import React and necessary components and libraries
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import the navigation bar component
import LandingPage from './components/LandingPage'; // Import the landing page component
import BreweriesList from './components/BreweriesList'; // Import the breweries list component
import Favourites from './components/Favourites'; // Import the favorites component
import AddBreweriesForm from './components/AddBreweryForm'; // Import the add breweries form component
import PubCrawlBuilder from './components/PubCrawlBuilder'; // Import the pub crawl builder component
import './App.css';

function App() {
  return (
    // Main application component
    <div className="App">
      <header className="App-header">
        {/* Create a client-side routing using BrowserRouter */}
        <BrowserRouter>
          {/* Render the navigation bar */}
          <NavBar />

            {/* Define routes for different URL paths */}
            <Routes>
            
            {/* Route for the root URL ('/') which renders the LandingPage component */}
            <Route path="/" element={<LandingPage />} />

            {/* Route for the '/breweries' URL which renders the BreweriesList component */}
            <Route path="/breweries" element={<BreweriesList />} />

            {/* Route for the '/favourites' URL which renders the Favourites component */}
            <Route path="/favourites" element={<Favourites />} />

            {/* Route for the '/addbreweries' URL which renders the AddBreweriesForm component */}
            <Route path="/addbreweries" element={<AddBreweriesForm />} />

            {/* Route for the '/pubcrawlbuilder' URL which renders the PubCrawlBuilder component */}
            <Route path="/pubcrawlbuilder" element={<PubCrawlBuilder />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

// Export the App component as the main entry point of the application
export default App;
