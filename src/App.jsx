import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import LandingPage from './components/LandingPage';
import BreweriesList from './components/BreweriesList'
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
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
