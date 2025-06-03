module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  });
};
