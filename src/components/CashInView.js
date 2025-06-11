import React from 'react';

const cashInData = {
  livestock: 7500,
  freshProduce: 5000,
};

const styles = {
  container: {
    backgroundColor: '#f1f8e9',
    borderRadius: '10px',
    padding: '25px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2E7D32',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#1B5E20',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #c5e1a5',
    fontSize: '18px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    fontWeight: '700',
    fontSize: '20px',
    color: '#33691E',
  },
};

const CashInView = () => {
  const total = cashInData.livestock + cashInData.freshProduce;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💰 Cash In - This Month</h2>
      <div style={styles.row}>
        <span>🐄 Livestock</span>
        <span>R {cashInData.livestock.toLocaleString()}</span>
      </div>
      <div style={styles.row}>
        <span>🥦 Fresh Produce</span>
        <span>R {cashInData.freshProduce.toLocaleString()}</span>
      </div>
      <div style={styles.totalRow}>
        <span>Total</span>
        <span>R {total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CashInView;
