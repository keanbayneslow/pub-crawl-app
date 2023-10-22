import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/NavBar.css'

function NavBar({ onSearch }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/breweries">Breweries</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/addbreweries">Add a Brewery</Link>
        </li>
        <li>
          <SearchBar onSearch={onSearch} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;