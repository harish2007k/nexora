const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/save-user", (req, res) => {
  const newUser = req.body;

  const folderPath = "./data";

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = "./data/users.json";

  let users = [];

  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath));
  }

  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.json({ message: "User saved successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});