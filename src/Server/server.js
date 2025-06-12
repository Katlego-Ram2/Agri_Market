const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db'); // DB connection module

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Validation Function
function validateUser(data) {
  const errors = {};
  if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
  if (!data.username?.trim()) errors.username = 'Username is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) errors.email = 'Valid email is required';
  if (!/^[0-9]{10,15}$/.test(data.phone || '')) errors.phone = 'Valid phone number is required';
  if (!['email', 'phone', 'whatsapp'].includes(data.communication)) errors.communication = 'Valid communication method required';
  if (!data.password || data.password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
}

// ✅ Registration Route
app.post('/register', async (req, res) => {
  try {
    const formData = req.body;
    const errors = validateUser(formData);

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors });
    }

    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [formData.username, formData.email]
    );

    if (existingUsers.length) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const roleId = formData.roleId || 1;

    const [result] = await pool.query(
      `INSERT INTO users (full_name, username, email, phone, communication, password_hash, role_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        formData.fullName.trim(),
        formData.username.trim(),
        formData.email.toLowerCase(),
        formData.phone.trim(),
        formData.communication,
        hashedPassword,
        roleId
      ]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Login Route with Role-Based Redirect
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (!users.length) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const roleRedirectMap = {
      1: '/CustomerDashboard',
      2: '/SupplierDashboard',
      3: '/Dashboard'
    };

    res.json({
      message: 'Login successful',
      userId: user.user_id,
      roleId: user.role_id,
      redirectPath: roleRedirectMap[user.role_id] || '/Welcome'
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Get User Profile
app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [result] = await pool.query(
      'SELECT full_name, username, email, phone, communication FROM users WHERE user_id = ?',
      [userId]
    );

    if (!result.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Update User Profile
app.put('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fullName, username, email, phone, communication, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updateQuery = `
      UPDATE users 
      SET full_name = ?, username = ?, email = ?, phone = ?, communication = ?${hashedPassword ? ', password_hash = ?' : ''}
      WHERE user_id = ?
    `;

    const queryParams = [
      fullName,
      username,
      email,
      phone,
      communication,
      ...(hashedPassword ? [hashedPassword, userId] : [userId])
    ];

    await pool.query(updateQuery, queryParams);

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/supply-request', async (req, res) => {
  const {
    userId,
    description,
    productName,
    category,
    price,
    numberPlate,
    contact,
    email
  } = req.body;

  const sql = `
    INSERT INTO supply_requests 
    (user_id, description, product_name, category, price, number_plate, contact, email) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(sql, [
      userId,
      description,
      productName,
      category,
      price,
      numberPlate,
      contact,
      email
    ]);

    console.log('Insert successful:', result);
    res.status(201).json({ message: 'Supply request submitted' });

  } catch (err) {
    console.error('Error inserting into database:', err);
    res.status(500).json({ message: 'Database insert failed' });
  }
});
// Assuming you already have your `pool` (MySQL connection pool) set up and imported

app.get('/api/purchased-stock/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Query purchased stock for the given user, calculate total_price
    const [rows] = await pool.query(
      `SELECT 
         id, 
         item, 
         quantity, 
         price_per_unit, 
         (quantity * price_per_unit) AS total_price, 
         date, 
         status
       FROM purchased_stock
       WHERE user_id = ?
       ORDER BY date DESC
       LIMIT 25`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching purchased stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
