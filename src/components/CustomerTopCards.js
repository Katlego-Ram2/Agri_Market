import React from 'react';

const CustomerTopCards = ({ onCardClick }) => {
  return (
    <div className="cards">
      <div className="card" onClick={() => onCardClick('shoppingCart')}>🛒 Shopping Cart</div>
      <div className="card" onClick={() => onCardClick('stock')}>📦 Stock in Market</div>
      <div className="card" onClick={() => onCardClick('purchaseHistory')}>📜 Purchase History</div>
      <div className="card" onClick={() => onCardClick('analytics')}>📊 Analytics</div>
    </div>
  );
};

export default CustomerTopCards;
