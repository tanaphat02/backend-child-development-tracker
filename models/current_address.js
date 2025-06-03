module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CurrentAddress", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    house_no: DataTypes.STRING,
    village_no: DataTypes.STRING,
    road: DataTypes.STRING,
    alley: DataTypes.STRING,
    sub_district: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    postal_code: DataTypes.STRING,
  });
};
