import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import CustomerTopCards from './CustomerTopCards';
import './Dashboard.css';

const CustomerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderDetails = () => {
    switch (selectedDetail) {
      case 'shoppingCart':
        return <p>🛒 Items currently in your shopping cart.</p>;
      case 'stock':
        return <p>📦 Current stock available in the market.</p>;
      case 'purchaseHistory':
        return <p>📜 Your purchase history records.</p>;
      case 'analytics':
        return <p>📊 View analytics dashboard for insights.</p>;
      case 'profile':
        return <p>👤 User Profile information goes here.</p>;
      case 'auditTrail':
        return <p>📋 Audit Trail details shown here.</p>;
      case 'rejectedStock':
        return <p>❌ List of Rejected Stock items.</p>;
      default:
        return <p>Select a card or sidebar item to view details.</p>;
    }
  };

  return (
    <div className="dashboard">
      <CustomerSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelect={setSelectedDetail} />
      <div className="main-content">
        <CustomerTopCards onCardClick={setSelectedDetail} />
        <div className="container">
          <h1 className="title">Agri Market</h1>
          <p className="subtitle">This is where your content will appear</p>
          <div className="details-box">
            {renderDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
