import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import LandingPage from './components/LandingPage';
import BreweriesList from './components/BreweriesList'
import Favourites from './components/Favourites';
import AddBreweriesForm from './components/AddBreweryForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/breweries" element={<BreweriesList />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/addbreweries" element={<AddBreweriesForm />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
