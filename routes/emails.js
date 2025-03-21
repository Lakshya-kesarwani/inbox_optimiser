const { google } = require("googleapis");
const express = require("express");
const router = express.Router();

router.get("/emails", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: req.user.accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  try {
    const { data } = await gmail.users.messages.list({ userId: "me", maxResults: 10 });
    const emails = [];

    for (let msg of data.messages) {
      const msgDetails = await gmail.users.messages.get({ userId: "me", id: msg.id });
      const headers = msgDetails.data.payload.headers;
      const from = headers.find(header => header.name === "From").value;
      emails.push({ id: msg.id, from });
    }

    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails", error });
  }
});

module.exports = (app) => {
  app.use("/api", router);
};
