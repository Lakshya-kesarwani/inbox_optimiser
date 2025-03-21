const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback Route
router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("http://localhost:3000"); // Redirect to frontend after login
    }
);

// Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.redirect("http://localhost:3000"); // Redirect after logout
    });
});

module.exports = router;
