import React from 'react';

const purchasedStock = [
  {
    id: 1,
    item: 'Cattle',
    quantity: 20,
    price: 'R 50,000',
    date: '2025-06-01',
    status: 'Delivered',
  },
  {
    id: 2,
    item: 'Spinach (kg)',
    quantity: 300,
    price: 'R 6,000',
    date: '2025-06-03',
    status: 'Delivered',
  },
  {
    id: 3,
    item: 'Goats',
    quantity: 15,
    price: 'R 30,000',
    date: '2025-05-28',
    status: 'Pending',
  },
];

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2E7D32',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f4fdf4',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  th: {
    backgroundColor: '#A5D6A7',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  status: {
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  delivered: {
    backgroundColor: '#C8E6C9',
    color: '#2E7D32',
  },
  pending: {
    backgroundColor: '#FFF9C4',
    color: '#FBC02D',
  },
};

const SupplierStockPurchased = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Stock Purchased</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Total Price</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {purchasedStock.map((stock) => (
            <tr key={stock.id}>
              <td style={styles.td}>{stock.item}</td>
              <td style={styles.td}>{stock.quantity}</td>
              <td style={styles.td}>{stock.price}</td>
              <td style={styles.td}>{stock.date}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    ...(stock.status === 'Delivered' ? styles.delivered : styles.pending),
                  }}
                >
                  {stock.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierStockPurchased;
