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
      return (
        <div>
          <h3>📚 Education Videos</h3>
          <p>Learn how to properly care for your animals and fresh produce:</p>
          
          <div className="video-list">
            <div className="video-item">
              <h4>How to Take Care of Livestock</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/QYxUNJ6qm8Y?si=GBdGFQ1ReK6Dzs5J" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
               picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            
            <div className="video-item">
              <h4>Fresh Produce Handling Tips</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/n7jWt7IF3QY?si=Bc15az-1B6_5hMjU" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
               gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

               </iframe>
            </div>

            <div className="video-item">
              <h4>General Farm Stock Care</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/Q_nO-kuImkc?si=vGbLCdF1fDs6Fw22" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      );
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
