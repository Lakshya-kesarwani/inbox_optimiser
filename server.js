const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
require("./config/passport"); // Ensure Passport config is loaded

const authRoutes = require("./routes/auth"); // Import auth routes
const emailRoutes = require("./routes/emails"); // Import email routes

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use("/auth", authRoutes);
app.use("/emails", emailRoutes); // Ensure your email routes exist
console.log(emailRoutes)
// Default route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
