import React from 'react';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaArrowLeft, 
  FaArrowRight, 
  FaHorse,       // for Livestock Animals
  FaAppleAlt,    // for Fresh Produce
  FaHeadset,     // Support
  FaBell,        // Notifications
  FaTags         // Offers
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, onSelect }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // ✅ Clear user data from localStorage
    navigate('/');        // 🔄 Redirect to homepage or login
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      <div className="sidebar-links">
        <a href="#profile" onClick={() => onSelect('profile')}>
          <FaUser className="icon" />
          {isOpen && <span className="label">Profile</span>}
        </a>

        <a href="#livestock" onClick={() => onSelect('livestock')}>
          <FaHorse className="icon" />
          {isOpen && <span className="label">Livestock Animals</span>}
        </a>

        <a href="#produce" onClick={() => onSelect('freshproduce')}>
          <FaAppleAlt className="icon" />
          {isOpen && <span className="label">Fresh Produce</span>}
        </a>

        <a href="#support" onClick={() => onSelect('support')}>
          <FaHeadset className="icon" />
          {isOpen && <span className="label">Support</span>}
        </a>

        <a href="#notifications" onClick={() => onSelect('notifications')}>
          <FaBell className="icon" />
          {isOpen && <span className="label">Notifications</span>}
        </a>

        <a href="#offers" onClick={() => onSelect('offers')}>
          <FaTags className="icon" />
          {isOpen && <span className="label">Offers</span>}
        </a>

        <a href="#logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          {isOpen && <span className="label">Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
