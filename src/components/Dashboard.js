import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopCards from './TopCards';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

const renderDetails = () => {
  switch (selectedDetail) {
    case 'requestToSupply':
      return <p>📬 View and manage your requests to supply products.</p>;
    case 'purchasedStock':
      return <p>🛒 Stock purchased by you (supplier) listed here.</p>;
    case 'requests':
      return <p>📦 32 New Requests have been submitted.</p>;
    case 'stock':
      return <p>📦 Current Stock available in the market.</p>;
    case 'rejectedStock':
      return <p>❌ List of Rejected Stock items.</p>;
    case 'profile':
      return <p>👤 User Profile information goes here.</p>;
    default:
      return <p>Select a card or sidebar item to view details.</p>;
  }
};


  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelect={setSelectedDetail} />
      <div className="main-content">
        <TopCards onCardClick={setSelectedDetail} />
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

export default Dashboard;
