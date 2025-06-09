import React from 'react';
import Sidebar from './Sidebar';
import TopCards from './TopCards';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopCards />
        <div className="container">
          <h1 className="title">Agri Market</h1>
          <p className="subtitle">This is where your content will appear</p>
          <div className="links">
            <a href="#link1" className="link">Link 1</a>
            <a href="#link2" className="link">Link 2</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
