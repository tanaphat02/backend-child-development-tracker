require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.js");
const childrenRoutes = require("./routes/children.js");

const db = require("./models");
const bcrypt = require("bcryptjs");
const User = db.User;

db.sequelize.sync().then(() => {
  console.log("✅ Tables are synced");
});

app.use("/api/auth", authRoutes);
app.use("/api/children", childrenRoutes);
app.use("/api/growth", require("./routes/growth.js"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
