import { DataTypes } from "sequelize";
import { sequelize  } from "../db/conexion.js";
// const sequelize = require('./con')

const User = sequelize.define("User",{
    name: {type: DataTypes.STRING(50),allowNull:false,unique:true},
    fullname: {type: DataTypes.STRING(50),},
    email: {type: DataTypes.STRING(60),allowNull:false,unique:true},
    age: {type: DataTypes.INTEGER},
    pass: {type: DataTypes.STRING, allowNull:false}
}, { timestamps: false }
)
// module.exports = User;
export default User