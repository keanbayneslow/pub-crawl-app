import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import '../styles/NavBar.css';

function NavBar({ onSearch }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/breweries" activeClassName="active">
            Breweries
          </NavLink>
        </li>
        <li>
          <NavLink to="/favourites" activeClassName="active">
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink to="/addbreweries" activeClassName="active">
            Add a Brewery
          </NavLink>
        </li>
        <li>
          <NavLink to="/pubcrawlbuilder" activeClassName="active">
            Build a Pub Crawl
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;