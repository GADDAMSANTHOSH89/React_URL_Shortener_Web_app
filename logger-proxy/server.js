// logger-proxy/server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const REMOTE = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = process.env.LOG_TOKEN || null;

app.post("/logs", async (req, res) => {
  try {
    const headers = { "Content-Type":"application/json" };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
    const r = await axios.post(REMOTE, req.body, { headers });
    res.status(r.status).json(r.data);
  } catch (err) {
    res.status(err.response?.status || 500).send(err.response?.data || err.message);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Proxy running at http://localhost:${port}/logs`));
