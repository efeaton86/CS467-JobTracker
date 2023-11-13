// Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Applications</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/skills">Skills</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
