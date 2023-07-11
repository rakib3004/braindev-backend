const Sequelize = require("sequelize");
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port : DB_PORT,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    //console.log(`${DB_HOST}:${DB_PORT} - Connection successful (${DB_USER})`);
  } catch (error) {
    //console.error(`${DB_HOST}:${DB_PORT} - Connection failed (${DB_USER}): ${error}`);
  }
})();

module.exports = sequelize;
