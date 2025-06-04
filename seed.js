const db = require("./models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs"); // เพิ่ม bcrypt สำหรับ hash password

async function seed() {
  await db.sequelize.sync({ force: true }); // ลบข้อมูลเก่าออกหมด

  const hashedPassword = await bcrypt.hash("123456", 10);
  await db.User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin",
  });

  for (let i = 1; i <= 20; i++) {
    // สร้าง CurrentAddress, RegAddress, Father, Mother, Guardian
    const currentAddress = await db.CurrentAddress.create({
      house_no: `${100 + i}`,
      village_no: `${i}`,
      road: "สุขใจ",
      alley: "ไม่มี",
      sub_district: "ทุ่งสุข",
      district: "เมือง",
      province: "กรุงเทพมหานคร",
      postal_code: "10200",
    });

    const regAddress = await db.RegAddress.create({
      house_no: `${200 + i}`,
      village_no: `${i}`,
      road: "สุขใจ",
      alley: "ไม่มี",
      sub_district: "ทุ่งสุข",
      district: "เมือง",
      province: "กรุงเทพมหานคร",
      postal_code: "10200",
    });

    const father = await db.Father.create({
      full_name: `พ่อ${i}`,
      prefix: "นาย",
      age: 40 + i,
      phone: `08100000${i.toString().padStart(2, "0")}`,
      occupation: "รับจ้าง",
      income_per_year: 120000 + i * 1000,
    });

    const mother = await db.Mother.create({
      full_name: `แม่${i}`,
      prefix: "นาง",
      age: 38 + i,
      phone: `08200000${i.toString().padStart(2, "0")}`,
      occupation: "ค้าขาย",
      income_per_year: 100000 + i * 1000,
    });

    const guardian = await db.Guardian.create({
      full_name: `ยาย${i}`,
      prefix: "นาง",
      age: 65 + i,
      relationship: "ยาย",
      phone: `08300000${i.toString().padStart(2, "0")}`,
      occupation: "เกษียณ",
      income_per_year: 50000 + i * 1000,
    });

    // สร้าง Child
    const child = await db.Child.create({
      first_name: `เด็ก${i}`,
      last_name: `สมมุติ${i}`,
      prefix: i % 2 === 0 ? "เด็กชาย" : "เด็กหญิง",
      citizen_id: `1234567890${i.toString().padStart(3, "0")}`,
      religion: "พุทธ",
      blood_type: "O",
      nationality: "ไทย",
      ethnicity: "ไทย",
      birth_date: `2019-02-${((i % 28) + 1).toString().padStart(2, "0")}`,
      phone: `08912345${i.toString().padStart(2, "0")}`,
      current_address_id: currentAddress.id,
      reg_address_id: regAddress.id,
      father_id: father.id,
      mother_id: mother.id,
      guardian_id: guardian.id,
    });

    // สร้าง GrowthRecord 3 ปี (2023, 2024, 2025)
    for (let y = 2023; y <= 2025; y++) {
      await db.GrowthRecord.create({
        child_id: child.id,
        age: 4 + (y - 2023),
        weight_kg: 15 + i + (y - 2023),
        height_cm: 100 + i + (y - 2023) * 2,
        sex: i % 2 === 0 ? "male" : "female",
        recorded_at: `${y}-06-15`,
        body_status: ["น้ำหนักน้อย", "น้ำหนักปกติ", "น้ำหนักเกิน"][(i + y) % 3],
        bmi:
          (15 + i + (y - 2023)) / Math.pow((100 + i + (y - 2023) * 2) / 100, 2),
      });
    }
  }

  console.log(
    "✅ Seeder: สร้างเด็ก 20 คน และ GrowthRecord คนละ 3 ปี (2023-2025) เรียบร้อยแล้ว"
  );
  //   process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  //   process.exit(1);
});
