import React from 'react';

const SupplierTopCards = ({ onCardClick }) => {
  return (
    <div className="cards">
      <div className="card" onClick={() => onCardClick('requestToSupply')}>
        📩 Request to Supply
      </div>
      <div className="card" onClick={() => onCardClick('stockPurchased')}>
        📦 Stock Purchased
      </div>
      <div className="card" onClick={() => onCardClick('analytics')}>
        📊 Analytics
      </div>
      <div className="card" onClick={() => onCardClick('profile')}>
        👤 Profile
      </div>
    </div>
  );
};

export default SupplierTopCards;
