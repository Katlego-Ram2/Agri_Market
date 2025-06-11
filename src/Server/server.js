const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); // For hashing passwords
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace with your actual URI - keep secret in env variables!
const uri = "mongodb+srv://Agri:Echo@agri.ek14abh.mongodb.net/Agri?retryWrites=true&w=majority";

const client = new MongoClient(uri);
let usersCollection;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB once and reuse the collection handle
async function connectToDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    const db = client.db("Agri");
    usersCollection = db.collection("users");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

connectToDB();

// Basic server-side validation function
function validateUserData(data) {
  const { fullName, username, email, phone, communication, password, confirmPassword } = data;
  const errors = {};

  if (!fullName || !fullName.trim()) errors.fullName = "Full name is required";
  if (!username || !username.trim()) errors.username = "Username is required";
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email is required";
  if (!phone || !phone.match(/^[0-9]{10,15}$/)) errors.phone = "Valid phone number is required";
  if (!communication || !["email","phone","whatsapp"].includes(communication)) errors.communication = "Select a valid communication method";
  if (!password || password.length < 8) errors.password = "Password must be at least 8 characters";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

  return errors;
}

app.post('/register', async (req, res) => {
  try {
    const formData = req.body;

    // Validate input
    const errors = validateUserData(formData);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Check if username or email already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { username: formData.username },
        { email: formData.email }
      ]
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username or Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Prepare user document
    const newUser = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.toLowerCase(),
      phone: formData.phone.trim(),
      communication: formData.communication,
      passwordHash: hashedPassword,
      createdAt: new Date()
    };

    // Insert into DB
    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
