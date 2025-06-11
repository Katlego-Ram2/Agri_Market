import React, { useState, useEffect } from 'react';

const initialStock = [
  { id: 1, name: 'Fresh Apples', category: 'Fruits', quantity: 120, price: 1.2 },
  { id: 2, name: 'Organic Carrots', category: 'Vegetables', quantity: 80, price: 0.8 },
  { id: 3, name: 'Milk', category: 'Dairy', quantity: 50, price: 1.5 },
  { id: 4, name: 'Cattle', category: 'Livestock', quantity: 20, price: 500 },
];

const StockInMarket = () => {
  const [stock, setStock] = useState(initialStock);

  // Example of fetching data if you want to replace initialStock with API call
  useEffect(() => {
    // fetch('/api/stock')
    //   .then(res => res.json())
    //   .then(data => setStock(data))
    //   .catch(err => console.error('Failed to fetch stock data', err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Stock in Market</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price (Rands)</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>R{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#1565c0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#BBDEFB',
    color: '#0D47A1',
    fontWeight: 'bold',
    borderBottom: '2px solid #0D47A1',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
};

export default StockInMarket;
