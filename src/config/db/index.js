const config = require("./config");
const sql = require("mssql");

let db;

async function connectDB() {
  try {
    let pool = await sql.connect(config);
    console.log("Connect to Database Successfully");
    db = pool;
    return db;
  } catch (error) {
    console.log("Cannot connect to Database");
    console.log(error);
  }
}

async function getVuons() {
  try {
    let Vuons = await db.request().query("SELECT * FROM Vuon");
    return Vuons.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVuons,
  connectDB,
};
