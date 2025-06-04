const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/provinces", async (req, res) => {
  const url =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
  const response = await axios.get(url);
  res.json(response.data);
});

router.get("/districts", async (req, res) => {
  const url =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
  const response = await axios.get(url);
  res.json(response.data);
});

router.get("/sub-districts", async (req, res) => {
  const url =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";
  const response = await axios.get(url);
  res.json(response.data);
});

module.exports = router;
