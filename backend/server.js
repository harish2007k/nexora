const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));
  
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  service: {
    type: String
  },
  requirement: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const app = express();

app.use(cors());
app.use(express.json());

/* ✅ ADD STEP 3 RIGHT HERE */
app.post("/api/save-user", async (req, res) => {
  try {
    await User.create(req.body);

    res.json({ message: "User saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving user" });
  }
});

/* Server start */
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});