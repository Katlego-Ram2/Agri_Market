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
      case 'users':
        return <p>👥 150 Active Users registered this month.</p>;
      case 'requests':
        return <p>📦 32 New Requests have been submitted.</p>;
      case 'cashin':
        return <p>💰 Cash Inflow: R12,500 from recent sales.</p>;
      case 'analytics':
        return <p>📊 View analytics dashboard for insights.</p>;
      default:
        return <p>Select a card above to view details.</p>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
