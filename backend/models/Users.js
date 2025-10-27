import { DataTypes } from "sequelize";
import { conn } from "../db/conexion.js";
// const sequelize = require('./con')

const User = conn.define(
  "User",
  {
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    fullname: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(60), allowNull: false, unique: true },
    age: { type: DataTypes.INTEGER },
    pass: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
// module.exports = User;
export default User;
