const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pollRoutes = require("./routes/pollRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "https://quick-polling-app-psf2.vercel.app/",
      "http://localhost:5173",
      process?.env?.CLIENT_URL ?? "",
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "Origin",
      "Accept",
      "X-Requested-With",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.options("*", cors());
app.use(express.json());

// Routes
app.use("/api", pollRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
