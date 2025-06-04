const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /provinces → ได้จังหวัดทั้งหมด
router.get("/provinces", async (req, res) => {
  try {
    const url =
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
    const response = await axios.get(url);
    res.json(Object.values(response.data));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

// GET /districts/:provinceId → ได้เฉพาะอำเภอของจังหวัดนั้น
router.get("/districts/:provinceId", async (req, res) => {
  try {
    const provinceId = req.params.provinceId;
    const url =
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
    const response = await axios.get(url);
    const allDistricts = Object.values(response.data);
    const filtered = allDistricts.filter((d) => d.province_id == provinceId);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch districts" });
  }
});

// GET /sub-districts/:amphureId → ได้เฉพาะตำบลของอำเภอนั้น
router.get("/sub-districts/:amphureId", async (req, res) => {
  try {
    const amphureId = req.params.amphureId;
    const url =
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";
    const response = await axios.get(url);
    const allSub = Object.values(response.data);
    const filtered = allSub.filter((s) => s.amphure_id == amphureId);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sub-districts" });
  }
});

module.exports = router;
