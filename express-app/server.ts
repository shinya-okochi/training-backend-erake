/** @format */

import { Sequelize } from "sequelize";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.MYSQL_CONNECTION_NAME}`,
    },
  }
);

const app = express();
const port = 8080;

app.get("/", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Connection has been established successfully." });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.json({ message: "Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default sequelize;
