import React from 'react';
import './Modal.css';

const ShoppingCartModal = ({ isOpen, onClose, items, onDeleteItem, onPay }) => {
  if (!isOpen) return null;

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="modal-overlay">
      <div className="modal shopping-cart-modal">
        <h2 className="modal-title">🛒 Shopping Cart</h2>
        {items.length === 0 ? (
          <p className="empty-cart-msg">Your cart is empty.</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price (R)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="cart-item">
                  <td className="item-name">{item.name}</td>
                  <td className="item-price">R {item.price.toFixed(2)}</td>
                  <td className="action-cell">
                    <button
                      className="delete-btn"
                      onClick={() => onDeleteItem(index)}
                      aria-label={`Delete ${item.name}`}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td><strong>Total:</strong></td>
                <td><strong>R {totalPrice.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="modal-buttons">
          <button
            className="pay-btn"
            onClick={onPay}
            disabled={items.length === 0}
          >
            Pay Now
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
