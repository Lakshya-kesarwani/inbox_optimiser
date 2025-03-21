const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String }, // Store user's Google profile picture
  emailAccounts: [
    {
      email: { type: String, required: true, unique: true },
      accessToken: { type: String, required: true }, // Token to access Gmail API
      refreshToken: { type: String, required: true }, // Refresh token for renewing access
      label: { type: String, default: "Primary" }, // Custom labels if needed
      unreadCount: { type: Number, default: 0 }, // Store unread emails count
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
