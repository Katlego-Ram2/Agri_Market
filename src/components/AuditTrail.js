import React, { useState, useEffect } from 'react';

const initialLogs = [
  { id: 1, timestamp: '2025-06-11 10:15:00', user: 'admin', action: 'Created user John Doe with role Supplier' },
  { id: 2, timestamp: '2025-06-11 10:30:00', user: 'supplier1', action: 'Submitted request for 20 cattle' },
  { id: 3, timestamp: '2025-06-11 11:00:00', user: 'admin', action: 'Approved request #2' },
];

const AuditTrail = () => {
  const [logs, setLogs] = useState(initialLogs);

  // Simulate fetching updated logs from backend
  const refreshLogs = () => {
    // In real app, fetch new logs here and update with setLogs
    alert('Simulate fetching updated logs');
  };

  useEffect(() => {
    // Example: fetch logs on mount (currently unused)
    // fetch('/api/audit-logs').then(...).then(data => setLogs(data))
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Audit Trail</h2>
      <button style={styles.refreshButton} onClick={refreshLogs}>Refresh Logs</button>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Timestamp</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.td}>{log.timestamp}</td>
                <td style={styles.td}>{log.user}</td>
                <td style={styles.td}>{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={styles.note}>* This audit trail logs key system actions.</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#2E7D32',
  },
  refreshButton: {
    backgroundColor: '#388E3C',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  tableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#A5D6A7',
    color: '#1B5E20',
    fontWeight: 'bold',
    borderBottom: '2px solid #1B5E20',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  tr: {
    transition: 'background-color 0.3s',
    cursor: 'default',
  },
  trHover: {
    backgroundColor: '#E8F5E9',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  note: {
    fontSize: '12px',
    color: '#666',
    marginTop: '10px',
  },
};

export default AuditTrail;
