// Navbar.js
import { Button } from 'react-bootstrap'
import { RiContactsBook2Line } from "react-icons/ri";
import { RiDonutChartFill } from "react-icons/ri";
import { BsFolder } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import "../styles/Navbar.css"

// Navbar.js
function Navbar() {

  const handleLogout = () => {
    // TODO: Add your logout logic here
    console.log('Logout clicked');
    // Example: Redirect to login page or dispatch a logout action
  };

    return (
        <nav className="sidebar">
            <a href="/applications" className="logo-section">     {/* Set applications page as the homepage */}
              <div className="job-tracker-title">JobTrekker</div>
            </a>
            <a href="/applications" className="nav-link"><BsFolder className="nav-icon"/> Applications</a>
            <a href="/contacts" className="nav-link"> <RiContactsBook2Line className="nav-icon"/> Contacts</a>
            <a href="/skills" className="nav-link"><RiDonutChartFill className="nav-icon" />Skills</a>
            <div className="logout-button-container">
              <Button className="nav-button" onClick={handleLogout}>
              <FiLogOut className="nav-icon"/> Logout
              </Button>
            </div>
        </nav>
      
    );
  }

  export default Navbar;