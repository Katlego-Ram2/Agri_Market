import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '←' : '→'}
      </button>
      
      <div className="sidebar-links">
        <a href="#profile">
          <span className="icon">👤</span>
          {isOpen && <span className="label">Profile</span>}
        </a>
        <a href="#logout">
          <span className="icon">🚪</span>
          {isOpen && <span className="label">Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
