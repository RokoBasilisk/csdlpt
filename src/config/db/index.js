const config = require("./config");
const sql = require("mssql");
const res = require("express/lib/response");

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

async function getAdminById(user) {
  let { username, password } = user;
  try {
    const result = await db
      .request()
      .input("input_username", sql.NVarChar, username)
      .query("select * from Administrator WHERE Username = @input_username");
    let recordset = result.recordset;
    return recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function findVuonById(id) {
  try {
    const result = await db
      .request()
      .input("input_id", sql.Int, id)
      .query("select * from Vuon where VuonId = @input_id");
    let recordset = result.recordset;
    return recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function editVuonById(form, id) {
  let { LoaiCayId, ChuVuonId, LoaiHinhDatDai, SoLuongCay, NgayGieoTrong } =
    form;
  try {
    const result = await db
      .request()
      .input("input_VuonId", sql.Int, id)
      .input("input_LoaiCayId", sql.Int, LoaiCayId)
      .input("input_ChuVuonId", sql.Int, ChuVuonId)
      .input("input_LoaiHinhDatDai", sql.NVarChar, LoaiHinhDatDai)
      .input("input_SoLuongCay", sql.Int, SoLuongCay)
      .input("input_NgayGieoTrong", sql.Date, NgayGieoTrong)
      .query(
        "update Vuon set LoaiCayId=@input_LoaiCayId,ChuVuonId=@input_ChuVuonId, LoaiHinhDatDai=@input_LoaiHinhDatDai, SoLuongCay=@input_SoLuongCay, NgayGieoTrong=@input_NgayGieoTrong where VuonId = @input_VuonId"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteVuon(id) {
  try {
    let record = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from Vuon where VuonId = @id");
    return record;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVuons,
  connectDB,
  getAdminById,
  editVuonById,
  findVuonById,
  deleteVuon,
};
