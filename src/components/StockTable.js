import React, { useState } from 'react';

const StockTable = ({ stocks }) => {
  const [filter, setFilter] = useState('');
  const [quantities, setQuantities] = useState({}); // Track quantity input per stock

  // Filter stocks by name or description
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(filter.toLowerCase()) ||
    stock.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value >= 0 ? value : 0
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
       <thead>
  <tr>
    <th>Stock Id</th>
    <th>Stock Name</th>
    <th>Description</th>
    <th>Price (R)</th>  {/* header is fine */}
    <th>Quantity</th>
    <th>Available</th>
    <th>Add to Cart</th>
  </tr>
</thead>
<tbody>
  {filteredStocks.map(stock => (
    <tr key={stock.id}>
      <td>{stock.id}</td>
      <td>{stock.name}</td>
      <td>{stock.description}</td>
      <td>R {stock.price.toFixed(2)}</td>  {/* added R before price */}
      <td>
        <input
          type="number"
          min="0"
          max={stock.available}
          value={quantities[stock.id] || ''}
          onChange={(e) => handleQuantityChange(stock.id, parseInt(e.target.value, 10) || 0)}
          style={{ width: '60px' }}
        />
      </td>
      <td>{stock.available}</td>
      <td>
        <button
          onClick={() => alert(`Added ${quantities[stock.id] || 0} ${stock.name} to cart`)}
          disabled={!quantities[stock.id] || quantities[stock.id] <= 0 || quantities[stock.id] > stock.available}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};
