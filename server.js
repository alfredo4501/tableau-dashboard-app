// Import required modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize Express app
const app = express();
const PORT = 5000; // Change if port is in use

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build"))); // Serve React build

// Test API Route
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Serve React App for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"), (err) => {
    if (err) {
      console.error("Error serving React app:", err);
      res.status(500).send(err);
    }
  });
});

// Start the server with error handling
app.listen(PORT, (err) => {
  if (err) {
    console.error("❌ Failed to start server:", err);
  } else {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  }
});
