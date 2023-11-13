import "../styles/Navbar.css"
import { Button } from 'react-bootstrap'


// Navbar.js
function Navbar() {
    return (

        <nav className="sidebar">
            <a href="/" className="logo-section">
              <div className="job-tracker-title">JobTrekker</div>
            </a>
            <a href="/applications">Applications</a>
            <a href="/contacts">Contacts</a>
            <a href="/skills">Skills</a>
        </nav>
      
    );
  }

  export default Navbar;