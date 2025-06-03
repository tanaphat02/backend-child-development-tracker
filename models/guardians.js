// father.model.js / mother.model.js / guardian.model.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Guardian", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    age: DataTypes.INTEGER,
    relationship: DataTypes.STRING,
    phone: DataTypes.STRING,
    occupation: DataTypes.STRING,
    income_per_year: DataTypes.DECIMAL(10, 2),
  });
};
