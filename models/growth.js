module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GrowthRecord", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sex: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: true,
    },
    body_status: DataTypes.ENUM("น้ำหนักน้อย", "น้ำหนักปกติ", "น้ำหนักเกิน"),
    bmi: DataTypes.DECIMAL(5, 2),
    child_id: { type: DataTypes.INTEGER, allowNull: false },
    age: DataTypes.INTEGER,
    weight_kg: DataTypes.DECIMAL(5, 2),
    height_cm: DataTypes.DECIMAL(5, 2),
    recorded_at: { type: DataTypes.DATE, allowNull: false },
  });
};
