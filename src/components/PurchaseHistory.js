import React from 'react';

const PurchaseHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return <p>You have no purchase history yet.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2>📜 Purchase History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#A5D6A7', color: '#1B5E20' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Item</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Quantity</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price (R)</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Total (R)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((purchase, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#E8F5E9' : 'white' }}>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{purchase.date}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{purchase.item}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{purchase.quantity}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{purchase.price.toFixed(2)}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                {(purchase.price * purchase.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
