const { DataTypes, Sequelize } = require("sequelize");

const UserSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING(10),
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  iconPhoto: {
    field: "icon_photo",
    allowNull: true,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
};

module.exports = { UserSchema };
