import React, { useState } from 'react';

const initialRequests = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Fresh tomatoes, organic farmed',
    category: 'Fresh Produce',
    price: 'R 1000',
    numberPlate: 'ND 123456',
    contact: '072 456 7890',
    email: 'john@example.com',
    comment: '',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Thando Mthembu',
    description: '2 young goats, good health',
    category: 'Livestock',
    price: 'R 5000',
    numberPlate: 'GP 987654',
    contact: '083 987 6543',
    email: 'thando@example.com',
    comment: '',
    status: 'Pending',
  },
  // Add more dummy requests as needed
];

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2E7D32',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f9fff9',
  },
  th: {
    backgroundColor: '#A5D6A7',
    padding: '10px',
    fontWeight: '600',
    textAlign: 'left',
    color: '#1B5E20',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    verticalAlign: 'top',
  },
  input: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#EF5350',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  status: {
    fontWeight: 'bold',
  },
};

const RequestTable = () => {
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  const handleCommentChange = (id, comment) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, comment } : req
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Pending Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Number Plate</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Comment</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td style={styles.td}>{req.name}</td>
              <td style={styles.td}>{req.description}</td>
              <td style={styles.td}>{req.category}</td>
              <td style={styles.td}>{req.price}</td>
              <td style={styles.td}>{req.numberPlate}</td>
              <td style={styles.td}>{req.contact}</td>
              <td style={styles.td}>{req.email}</td>
              <td style={styles.td}>
                <textarea
                  rows={3}
                  value={req.comment}
                  onChange={(e) => handleCommentChange(req.id, e.target.value)}
                  style={styles.input}
                  placeholder="Add comment..."
                />
              </td>
              <td style={styles.td}>
                <span style={styles.status}>{req.status}</span>
              </td>
              <td style={styles.td}>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.acceptButton}
                    onClick={() => updateStatus(req.id, 'Accepted')}
                    disabled={req.status !== 'Pending'}
                  >
                    Accept
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() => updateStatus(req.id, 'Rejected')}
                    disabled={req.status !== 'Pending'}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
