module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Child", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    prefix: DataTypes.ENUM("เด็กชาย", "เด็กหญิง"),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    citizen_id: DataTypes.STRING,
    religion: DataTypes.STRING,
    blood_type: DataTypes.STRING,
    nationality: DataTypes.STRING,
    ethnicity: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    phone: DataTypes.STRING,

    current_address_id: { type: DataTypes.INTEGER, unique: true },
    reg_address_id: { type: DataTypes.INTEGER, unique: true },
    father_id: { type: DataTypes.INTEGER, unique: true },
    mother_id: { type: DataTypes.INTEGER, unique: true },
    guardian_id: { type: DataTypes.INTEGER, allowNull: true }, // optional
  });
};
