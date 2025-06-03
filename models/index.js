const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models
db.User = require("./user.js")(sequelize, Sequelize);
db.Child = require("./child.js")(sequelize, Sequelize);
db.CurrentAddress = require("./current_address.js")(sequelize, Sequelize);
db.RegAddress = require("./reg_address.js")(sequelize, Sequelize);
db.Father = require("./father.js")(sequelize, Sequelize);
db.Mother = require("./mother.js")(sequelize, Sequelize);
db.Guardian = require("./guardians.js")(sequelize, Sequelize);
db.GrowthRecord = require("./growth.js")(sequelize, Sequelize);

db.Child.hasMany(db.GrowthRecord, {
  foreignKey: "child_id",
  as: "growthRecords",
});
db.GrowthRecord.belongsTo(db.Child, {
  foreignKey: "child_id",
  as: "child",
});

db.Child.belongsTo(db.CurrentAddress, {
  foreignKey: "current_address_id",
  as: "currentAddress",
});
db.Child.belongsTo(db.RegAddress, {
  foreignKey: "reg_address_id",
  as: "regAddress",
});
db.Child.belongsTo(db.Father, { foreignKey: "father_id", as: "father" });
db.Child.belongsTo(db.Mother, { foreignKey: "mother_id", as: "mother" });
db.Child.belongsTo(db.Guardian, { foreignKey: "guardian_id", as: "guardian" });

module.exports = db;
