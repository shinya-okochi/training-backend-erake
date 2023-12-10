"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.MYSQL_CONNECTION_NAME}`,
    },
});
const app = (0, express_1.default)();
const port = 8080;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        res.json({ message: "Connection has been established successfully." });
    }
    catch (err) {
        console.error("Unable to connect to the database:", err);
        res.json({ message: "Error" });
    }
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.default = sequelize;
