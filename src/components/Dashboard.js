import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopCards from './TopCards';
import AnalyticsDashboard from './AnalyticsDashboard';
import CashInView from './CashInView';
import RequestTable from './RequestTable';
import EditableUserTable from './EditableUserTable';
import AuditTrail from './AuditTrail';
import StockInMarket from './StockInMarket'; 
import RejectedStock from './RejectedStock';
import Profile from './Profile';  // <-- Import Profile component
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleSidebar = () => setSidebarOpen(open => !open);

  const handleSelect = (detail) => {
    console.log('Selected detail:', detail);
    setSelectedDetail(detail);
  };

  const renderDetails = () => {
    switch (selectedDetail) {
      case 'profile':
        return <Profile />;  // <-- Show profile when selected
      case 'users':
        return <EditableUserTable />;
      case 'requests':
        return <RequestTable />;
      case 'cashin':
        return <CashInView />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'auditTrail':
        return <AuditTrail />;
      case 'stock':
        return <StockInMarket />;
      case 'rejectedStock':
        return <RejectedStock />;
      default:
        return <p>Select a card or sidebar item to view details.</p>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onSelect={handleSelect}
      />
      <div className="main-content">
        <TopCards onCardClick={handleSelect} />
        <div className="container">
          <h1 className="title">Agri Market</h1>
          <p className="subtitle">Your gateway to fresh produce and livestock</p>
          <div className="details-box">{renderDetails()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
