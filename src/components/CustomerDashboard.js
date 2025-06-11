import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import CustomerTopCards from './CustomerTopCards';
import ShoppingCartModal from './ShoppingCartModal';
import PurchaseHistory from './PurchaseHistory';  // existing
import AnalyticsDashboard from './AnalyticsDashboard'; // new import
import Profile from './Profile';  // new import
import './Dashboard.css';

const StockTable = ({ stocks }) => {
  const [filter, setFilter] = useState('');
  const [quantities, setQuantities] = useState({});

  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(filter.toLowerCase()) ||
    stock.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value >= 0 ? value : 0
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Stock Id</th>
            <th>Stock Name</th>
            <th>Description</th>
            <th>Price (R)</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.name}</td>
              <td>{stock.description}</td>
              <td>{stock.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={stock.available}
                  value={quantities[stock.id] || ''}
                  onChange={(e) => handleQuantityChange(stock.id, parseInt(e.target.value, 10) || 0)}
                  style={{ width: '60px' }}
                />
              </td>
              <td>{stock.available}</td>
              <td>
                <button
                  onClick={() => alert(`Added ${quantities[stock.id] || 0} ${stock.name} to cart`)}
                  disabled={!quantities[stock.id] || quantities[stock.id] <= 0 || quantities[stock.id] > stock.available}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CustomerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState('home');
  const [showCartModal, setShowCartModal] = useState(false);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleCardClick = (detail) => {
    if (detail === 'shoppingCart') {
      setShowCartModal(true);
    } else {
      setSelectedDetail(detail);
    }
  };

  const closeModal = () => setShowCartModal(false);

  const handleDeleteItem = (index) => {
    setShoppingCartItems((items) => items.filter((_, i) => i !== index));
  };

  const handlePay = () => {
    alert('Thank you for your payment!');
    setShoppingCartItems([]);
    setShowCartModal(false);
  };

  const livestockStock = [
    { id: 'L001', name: 'Cattle', description: 'Healthy beef cattle', price: 12000, available: 10 },
    { id: 'L002', name: 'Goats', description: 'Farm goats', price: 2500, available: 25 }
  ];

  const produceStock = [
    { id: 'P001', name: 'Apples', description: 'Fresh red apples', price: 2.5, available: 100 },
    { id: 'P002', name: 'Wheat', description: 'High quality wheat grains', price: 1.2, available: 50 },
    { id: 'P003', name: 'Corn', description: 'Sweet corn', price: 3.0, available: 75 },
  ];

  // Dummy purchase history data
  const purchaseHistoryData = [
    { date: '2025-05-01', item: 'Cattle', quantity: 2, price: 12000 },
    { date: '2025-05-03', item: 'Apples', quantity: 50, price: 2.5 },
    { date: '2025-05-05', item: 'Goats', quantity: 5, price: 2500 },
  ];

  const renderLandingScreen = () => {
    const styles = {
      container: {
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#E8F5E9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: '30px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2E7D32',
      },
      title: {
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '12px',
      },
      subtitle: {
        fontSize: '16px',
        marginBottom: '25px',
        color: '#4CAF50',
      },
      buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
      },
      button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'background-color 0.3s ease',
        userSelect: 'none',
      }
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>🛒 Welcome to Agri Market</h2>
        <p style={styles.subtitle}>Choose a category to get started</p>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setSelectedDetail('livestock')}
            style={styles.button}
            type="button"
          >
            🐄 Livestock
          </button>
          <button
            onClick={() => setSelectedDetail('freshproduce')}
            style={styles.button}
            type="button"
          >
            🥬 Fresh Produce
          </button>
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    switch (selectedDetail) {
      case 'livestock':
        return <StockTable stocks={livestockStock} />;
      case 'freshproduce':
        return <StockTable stocks={produceStock} />;
      case 'purchaseHistory':
        return <PurchaseHistory history={purchaseHistoryData} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'profile':       // Added profile case here
        return <Profile />;
      default:
        return renderLandingScreen();
    }
  };

  return (
    <div className="dashboard">
      <CustomerSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onSelect={setSelectedDetail}
      />
      <div className="main-content">
        <CustomerTopCards onCardClick={handleCardClick} />
        <div className="container">
          <h1 className="title">Agri Market</h1>
          <p className="subtitle">Your gateway to fresh produce and livestock</p>
          <div className="details-box">{renderDetails()}</div>
        </div>
      </div>

      <ShoppingCartModal
        isOpen={showCartModal}
        onClose={closeModal}
        items={shoppingCartItems}
        onDeleteItem={handleDeleteItem}
        onPay={handlePay}
      />
    </div>
  );
};

export default CustomerDashboard;
