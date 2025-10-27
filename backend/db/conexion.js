import dotenv from "dotenv";
import fs from "fs";
import { Sequelize } from "sequelize";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("MySQL conneted OK."))
  .catch((err) => console.log("MySQL connection error: " + err));

// export default sequelize;
