import dbConfig from "../config/dbConfig.js";
import mysql from "mysql2";
import { Sequelize } from "sequelize";
import article from "./article.js";

const db = {};

const init = () => {
  const { host, user, password, dataBase } = dbConfig;
  const connection = mysql.createConnection({ host, user, password });
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${dataBase}\`;`);

  const sequelize = new Sequelize(dataBase, user, password, {
    dialect: "mysql",
  });

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.Article = article(sequelize, Sequelize);
};

init();

export default db;
