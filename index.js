const express = require("express");
const app = express();

app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  res.json({ reply: "AIっぽい返事: " + userMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});