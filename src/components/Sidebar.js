import React from 'react';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaArrowLeft, 
  FaArrowRight, 
  FaClipboardList, 
  FaBoxes, 
  FaTimesCircle 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, onSelect }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // ✅ Clear localStorage on logout
    navigate('/');        // 🔄 Redirect to home or login page
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

        <a href="#audit-trail" onClick={() => onSelect('auditTrail')}>
          <FaClipboardList className="icon" />
          {isOpen && <span className="label">Audit Trail</span>}
        </a>

        <a href="#stock" onClick={() => onSelect('stock')}>
          <FaBoxes className="icon" />
          {isOpen && <span className="label">Stock in Market</span>}
        </a>

        <a href="#rejected-stock" onClick={() => onSelect('rejectedStock')}>
          <FaTimesCircle className="icon" />
          {isOpen && <span className="label">Rejected Stock</span>}
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
