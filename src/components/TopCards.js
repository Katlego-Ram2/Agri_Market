import React from 'react';


const TopCards = ({ onCardClick }) => {
  return (
    <div className="cards">
      <div className="card" onClick={() => onCardClick('users')}>👥 Users: 150</div>
      <div className="card" onClick={() => onCardClick('requests')}>📦 Requests: 32</div>
      <div className="card" onClick={() => onCardClick('cashin')}>💰 Cash In: R12,500</div>
      <div className="card" onClick={() => onCardClick('analytics')}>📊 Analytics: View</div>
    </div>
  );
};

export default TopCards;

