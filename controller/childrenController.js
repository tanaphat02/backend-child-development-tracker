const db = require("../models");
const Child = db.Child;
const CurrentAddress = db.CurrentAddress;
const RegAddress = db.RegAddress;
const Father = db.Father;
const Mother = db.Mother;
const Guardian = db.Guardian;

exports.getAllChildrenData = async (req, res) => {
  try {
    const children = await Child.findAll({
      include: [
        { model: CurrentAddress, as: "currentAddress" },
        { model: RegAddress, as: "regAddress" },
        { model: Father, as: "father" },
        { model: Mother, as: "mother" },
        { model: Guardian, as: "guardian" },
      ],
    });
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllChildren = async (req, res) => {
  try {
    const children = await Child.findAll({});
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getChildById = async (req, res) => {
  try {
    const child = await Child.findOne({
      where: { id: req.params.id },
      include: [
        { model: CurrentAddress, as: "currentAddress" },
        { model: RegAddress, as: "regAddress" },
        { model: Father, as: "father" },
        { model: Mother, as: "mother" },
        { model: Guardian, as: "guardian" },
      ],
    });
    if (!child) return res.status(404).json({ message: "Child not found" });
    res.json(child);
  } catch (error) {
    console.error("Error fetching child by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createChild = async (req, res) => {
  try {
    // รับข้อมูลจาก req.body
    const {
      prefix,
      first_name,
      last_name,
      citizen_id,
      religion,
      blood_type,
      nationality,
      ethnicity,
      birth_date,
      phone,
      currentAddress,
      regAddress,
      father,
      mother,
      guardian,
    } = req.body;

    // สร้างที่อยู่ปัจจุบัน
    const currentAddr = await CurrentAddress.create(currentAddress);
    // สร้างที่อยู่ตามทะเบียนบ้าน
    const regAddr = await RegAddress.create(regAddress);
    // สร้างพ่อ แม่ ผู้ปกครอง
    const fatherObj = await Father.create(father);
    const motherObj = await Mother.create(mother);
    const guardianObj = await Guardian.create(guardian);

    // สร้างเด็ก
    const child = await Child.create({
      prefix,
      first_name,
      last_name,
      citizen_id,
      religion,
      blood_type,
      nationality,
      ethnicity,
      birth_date,
      phone,
      current_address_id: currentAddr.id,
      reg_address_id: regAddr.id,
      father_id: fatherObj.id,
      mother_id: motherObj.id,
      guardian_id: guardianObj.id,
    });

    res.status(201).json({ message: "Child created successfully", child });
  } catch (error) {
    console.error("Error creating child:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
