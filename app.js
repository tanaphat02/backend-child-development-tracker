require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.js");
const childrenRoutes = require("./routes/children.js");

const db = require("./models");
const bcrypt = require("bcryptjs");
const User = db.User;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("✅ Tables are synced");

//   (async () => {
//     const existingUser = await User.findOne({ where: { username: "admin" } });
//     if (!existingUser) {
//       const hashed = await bcrypt.hash("123456", 10);
//       await User.create({
//         username: "admin",
//         name: "Admin User",
//         password: hashed,
//       });
//       console.log("✅ Test user 'admin' created");
//     } else {
//       console.log("ℹ️ Admin user already exists");
//     }

//     const { Child, Father, Mother, CurrentAddress, RegAddress, Guardian } = db;

//     for (let i = 1; i <= 10; i++) {
//       const citizenId = `12345678901${i.toString().padStart(2, "0")}`;

//       const existingChild = await Child.findOne({
//         where: { citizen_id: citizenId },
//       });

//       if (!existingChild) {
//         const currentAddress = await CurrentAddress.create({
//           house_no: `${100 + i}`,
//           village_no: `${i}`,
//           road: `สุขใจ ${i}`,
//           alley: `ซอย ${i}`,
//           sub_district: "ทุ่งสุข",
//           district: "เมือง",
//           province: "กรุงเทพมหานคร",
//           postal_code: "10200",
//         });

//         const regAddress = await RegAddress.create({
//           house_no: `${200 + i}`,
//           village_no: `${i}`,
//           road: `สันติภาพ ${i}`,
//           alley: `ซอย ${i}`,
//           sub_district: "กลางเมือง",
//           district: "เมือง",
//           province: "กรุงเทพมหานคร",
//           postal_code: "10200",
//         });

//         const father = await Father.create({
//           full_name: `นายสมชาย ใจดี ${i}`,
//           prefix: "นาย",
//           age: 40 + i,
//           phone: `08123456${i.toString().padStart(2, "0")}`,
//           occupation: "พนักงานรัฐ",
//           income_per_year: 150000 + i * 1000,
//         });

//         const mother = await Mother.create({
//           full_name: `นางสมหญิง น่ารัก ${i}`,
//           prefix: "นางสาว",
//           age: 38 + i,
//           phone: `08999999${i.toString().padStart(2, "0")}`,
//           occupation: "ค้าขาย",
//           income_per_year: 120000 + i * 1000,
//         });

//         const guardian = await Guardian.create({
//           full_name: `ยายสมศรี ${i}`,
//           prefix: "นาง",
//           age: 65 + i,
//           relationship: "ยาย",
//           phone: `08765432${i.toString().padStart(2, "0")}`,
//           occupation: "เกษียณ",
//           income_per_year: 50000 + i * 1000,
//         });

//         await Child.create({
//           first_name: `กิติ${i}`,
//           last_name: `สมมุติ${i}`,
//           prefix: "เด็กชาย",
//           citizen_id: citizenId,
//           religion: "พุทธ",
//           blood_type: "O",
//           nationality: "ไทย",
//           ethnicity: "ไทย",
//           birth_date: `2019-02-${((i % 28) + 1).toString().padStart(2, "0")}`,
//           phone: `08912345${i.toString().padStart(2, "0")}`,
//           current_address_id: currentAddress.id,
//           reg_address_id: regAddress.id,
//           father_id: father.id,
//           mother_id: mother.id,
//           guardian_id: guardian.id,
//         });
//       } else {
//         console.log(`ℹ️ เด็กคนที่ ${i} มีอยู่แล้ว`);
//       }
//     }

//     // ตัวอย่างเพิ่มเด็กทดสอบอีก 1 คน
//     const existingChild = await Child.findOne({
//       where: { citizen_id: "1234567890123" },
//     });
//     if (!existingChild) {
//       const currentAddress = await CurrentAddress.create({
//         house_no: "123",
//         village_no: "4",
//         road: "สุขใจ",
//         alley: "ไม่มี",
//         sub_district: "ทุ่งสุข",
//         district: "เมือง",
//         province: "กรุงเทพมหานคร",
//         postal_code: "10200",
//       });

//       const regAddress = await RegAddress.create({
//         house_no: "45",
//         village_no: "1",
//         road: "สันติภาพ",
//         alley: "ไม่มี",
//         sub_district: "กลางเมือง",
//         district: "เมือง",
//         province: "กรุงเทพมหานคร",
//         postal_code: "10200",
//       });

//       const father = await Father.create({
//         full_name: "นายสมชาย ใจดี",
//         age: 40,
//         phone: "0812345678",
//         occupation: "พนักงานรัฐ",
//         income_per_year: 150000,
//       });

//       const mother = await Mother.create({
//         full_name: "นางสมหญิง น่ารัก",
//         age: 38,
//         phone: "0899999999",
//         occupation: "ค้าขาย",
//         income_per_year: 120000,
//       });

//       const guardian = await Guardian.create({
//         full_name: "ยายสมศรี",
//         age: 65,
//         phone: "0876543210",
//         occupation: "เกษียณ",
//         income_per_year: 50000,
//       });

//       await Child.create({
//         first_name: "กิติ",
//         last_name: "สมมุติ",
//         prefix: "เด็กชาย",
//         citizen_id: "1234567890123",
//         religion: "พุทธ",
//         blood_type: "O",
//         nationality: "ไทย",
//         ethnicity: "ไทย",
//         birth_date: "2019-02-20",
//         phone: "0891234567",
//         current_address_id: currentAddress.id,
//         reg_address_id: regAddress.id,
//         father_id: father.id,
//         mother_id: mother.id,
//         guardian_id: guardian.id,
//       });

//       console.log("✅ Seeder: เพิ่มเด็กพร้อมพ่อแม่ที่อยู่แล้ว");
//     } else {
//       console.log("ℹ️ เด็กทดสอบมีอยู่แล้ว");
//     }
//   })();
// });

app.use("/api/auth", authRoutes);
app.use("/api/children", childrenRoutes);
app.use("/api/growth", require("./routes/growth.js"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
