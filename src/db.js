const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Agri:Echo@agri.ek14abh.mongodb.net/Agri?retryWrites=true&w=majority";

async function connectToMongo() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    const db = client.db("Agri"); 
  
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections);
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  } finally {
    await client.close();
  }
}

connectToMongo();
