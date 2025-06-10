import React, { useState } from 'react';
import SupplierSidebar from './SupplierSidebar';   // use SupplierSidebar here
import SupplierTopCards from './SupplierTopCards';
import './Dashboard.css';

const SupplierDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
const renderDetails = () => {
  switch (selectedDetail) {
    case 'requestToSupply':
      return <p>📩 Submit your requests to supply stock here.</p>;
    case 'stockPurchased':
      return <p>📦 List of stocks you have purchased.</p>;
    case 'analytics':
      return <p>📊 View analytics dashboard for insights.</p>;
    case 'education':
      return <p>📚 Education</p>;
    default:
      return <p>Select a card or sidebar item to view details.</p>;
  }
};


  return (
    <div className="dashboard">
      <SupplierSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelect={setSelectedDetail} />
      <div className="main-content">
        <SupplierTopCards onCardClick={setSelectedDetail} />
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

export default SupplierDashboard;
