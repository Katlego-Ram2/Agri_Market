import React, { useState } from 'react';

const EditableUserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Supplier' },
    { id: 3, name: 'Admin Guy', email: 'admin@example.com', role: 'Admin' },
  ]);

  const handleInputChange = (e, index, field) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = e.target.value;
    setUsers(updatedUsers);
  };

  const handleSave = (index) => {
    const user = users[index];
    console.log('Saved user:', user);
    // Here you would normally make an API call to update the user
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const thTdStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'left',
  };

  const inputStyle = {
    padding: '5px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2E7D32', marginBottom: '10px' }}>👥 Manage Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Email</th>
            <th style={thTdStyle}>Role</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td style={thTdStyle}>{user.id}</td>
              <td style={thTdStyle}>
                <input
                  type="text"
                  value={user.name}
                  style={inputStyle}
                  onChange={(e) => handleInputChange(e, index, 'name')}
                />
              </td>
              <td style={thTdStyle}>
                <input
                  type="email"
                  value={user.email}
                  style={inputStyle}
                  onChange={(e) => handleInputChange(e, index, 'email')}
                />
              </td>
              <td style={thTdStyle}>
                <select
                  value={user.role}
                  style={inputStyle}
                  onChange={(e) => handleInputChange(e, index, 'role')}
                >
                  <option value="Customer">Customer</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle} onClick={() => handleSave(index)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableUserTable;
