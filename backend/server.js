const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ ADD STEP 3 RIGHT HERE */
app.post("/api/save-user", (req, res) => {
  const userData = req.body;
  console.log("Received Data:", userData);
  res.status(200).json({ message: "User saved successfully" });
});

/* Server start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});