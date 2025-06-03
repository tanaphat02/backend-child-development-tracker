const db = require("../models");
const { Op } = require("sequelize");

exports.createGrowthRecord = async (req, res) => {
  try {
    const {
      child_id,
      age,
      weight_kg,
      height_cm,
      recorded_at,
      bmi,
      sex,
      body_status,
    } = req.body;

    // ไม่ต้องเช็กซ้ำในวันเดียวกันแล้ว
    const record = await db.GrowthRecord.create({
      child_id,
      age,
      weight_kg,
      height_cm,
      sex,
      recorded_at,
      body_status,
      bmi,
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGrowthRecords = async (req, res) => {
  try {
    const { child_id } = req.query;
    const where = child_id ? { child_id } : {};
    const records = await db.GrowthRecord.findAll({
      where,
      order: [["recorded_at", "DESC"]],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLatestGrowthRecordByChild = async (req, res) => {
  try {
    const { child_id } = req.params;

    const record = await db.GrowthRecord.findOne({
      where: { child_id },
      order: [["recorded_at", "DESC"]],
    });

    if (!record) return res.status(404).json({ message: "ไม่พบข้อมูล" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllGrowthRecordsByChild = async (req, res) => {
  try {
    const { child_id } = req.params;
    const records = await db.GrowthRecord.findAll({
      where: { child_id },
      order: [["recorded_at", "ASC"]],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGrowthStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear];

    // 1. ดึงข้อมูลทั้งหมดใน 3 ปี
    const allRecords = await db.GrowthRecord.findAll({
      where: {
        recorded_at: {
          [Op.between]: [
            new Date(`${currentYear - 2}-01-01`),
            new Date(`${currentYear}-12-31`),
          ],
        },
      },
      raw: true,
    });

    // 2. เลือก record ล่าสุดของแต่ละ child_id ในแต่ละปี
    const latestByChildYear = {};
    for (const rec of allRecords) {
      const year = new Date(rec.recorded_at).getFullYear();
      if (!years.includes(year)) continue;
      const key = `${rec.child_id}_${year}`;
      if (
        !latestByChildYear[key] ||
        new Date(rec.recorded_at) > new Date(latestByChildYear[key].recorded_at)
      ) {
        latestByChildYear[key] = { ...rec, year };
      }
    }
    const latestRecords = Object.values(latestByChildYear);

    // 3. Group by year, sex, body_status
    const bar = [];
    for (const year of years) {
      for (const sex of ["male", "female"]) {
        for (const status of ["น้ำหนักน้อย", "น้ำหนักปกติ", "น้ำหนักเกิน"]) {
          const count = latestRecords.filter(
            (r) => r.year === year && r.sex === sex && r.body_status === status
          ).length;
          bar.push({ year, sex, body_status: status, count });
        }
      }
    }

    // 4. สำหรับโดนัท (ทั้งปี เอา record ล่าสุดของแต่ละ child_id)
    const latestByChild = {};
    for (const rec of allRecords) {
      if (
        !latestByChild[rec.child_id] ||
        new Date(rec.recorded_at) >
          new Date(latestByChild[rec.child_id].recorded_at)
      ) {
        latestByChild[rec.child_id] = rec;
      }
    }
    const donutRecords = Object.values(latestByChild);
    const donut = ["น้ำหนักน้อย", "น้ำหนักปกติ", "น้ำหนักเกิน"].map(
      (status) => ({
        body_status: status,
        count: donutRecords.filter((r) => r.body_status === status).length,
      })
    );

    res.json({ bar, donut });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
