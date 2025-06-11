import React, { useState } from 'react';
import SupplierSidebar from './SupplierSidebar';
import SupplierTopCards from './SupplierTopCards';
import SupplierAnalytics from './SupplierAnalytics';
import SupplierStockPurchased from './SupplierStockPurchased'; // ✅ NEW
import Profile from './Profile';  // <-- Added import for Profile component
import './Dashboard.css';

const SupplierDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    name: '',
    category: '',
    price: '',
    numberPlate: '',
    contact: '',
    email: ''
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Supply request submitted!');
    setFormData({
      description: '',
      name: '',
      category: '',
      price: '',
      numberPlate: '',
      contact: '',
      email: ''
    });
  };

  const renderDetails = () => {
    switch (selectedDetail) {
      case 'profile':               // <-- Added this case to render Profile
        return <Profile />;

      case 'requestToSupply':
        return (
          <div className="supply-form">
            <h3>📩 Request to Supply Stock</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="livestock">Livestock</option>
                  <option value="freshProduce">Fresh Produce</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price (per unit):</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Number Plate:</label>
                <input
                  type="text"
                  name="numberPlate"
                  value={formData.numberPlate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Supplier Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit">Submit Request</button>
            </form>
          </div>
        );

      case 'stockPurchased':
        return <SupplierStockPurchased />; // ✅ Renders the detailed stock list

      case 'analytics':
        return <SupplierAnalytics />;

      case 'education':
        return (
          <div>
            <h3>📚 Education Videos</h3>
            <p>Learn how to properly care for your animals and fresh produce:</p>

            <div className="video-list">
              <div className="video-item">
                <h4>How to Take Care of Livestock</h4>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/QYxUNJ6qm8Y?si=GBdGFQ1ReK6Dzs5J"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="video-item">
                <h4>Fresh Produce Handling Tips</h4>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/n7jWt7IF3QY?si=Bc15az-1B6_5hMjU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="video-item">
                <h4>General Farm Stock Care</h4>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Q_nO-kuImkc?si=vGbLCdF1fDs6Fw22"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
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
          <p className="subtitle">Your gateway to fresh produce and livestock</p>
          <div className="details-box">{renderDetails()}</div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
