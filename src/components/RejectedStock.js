import React from 'react';

const rejectedStockData = [
  { id: 1, name: 'Old Apples', reason: 'Spoiled', quantity: 50 },
  { id: 2, name: 'Damaged Cattle', reason: 'Health issues', quantity: 5 },
  { id: 3, name: 'Wilted Lettuce', reason: 'Expired', quantity: 30 },
];

const RejectedStock = () => {
  const [hoveredRow, setHoveredRow] = React.useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rejected Stock</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {rejectedStockData.map((item) => (
            <tr
              key={item.id}
              style={{
                ...styles.row,
                backgroundColor: hoveredRow === item.id ? '#ffe5e5' : 'transparent',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={() => setHoveredRow(item.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.reason}</td>
              <td style={styles.td}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#d32f2f', // a strong red for rejected items
    fontWeight: '700',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '16px',
  },
  headerRow: {
    backgroundColor: '#f44336', // red header background
    color: 'white',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '3px solid #b71c1c',
  },
  row: {
    borderBottom: '1px solid #ddd',
    cursor: 'default',
    transition: 'background-color 0.3s',
  },
  td: {
    padding: '12px',
  },
};

// Add hover effect with inline styles using React's synthetic events is a bit tricky; 
// but you can add a CSS class for it or use inline event handlers if you want.

export default RejectedStock;
