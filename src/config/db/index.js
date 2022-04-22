const { configsv1, configsv2, configsv3 } = require("./config");
const sql = require("mssql");

let db1;
let db2;
let db3;

async function selectDB(server) {
  if (server === "VN") {
    await sql.close();
    let pool = await sql.connect(configsv1);
    return pool;
  }
  if (server === "NORTH") {
    await sql.close();
    let pool = await sql.connect(configsv3);
    return pool;
  }
  if (server === "CENT") {
    await sql.close();
    let pool = await sql.connect(configsv2);
    return pool;
  }
}

async function connectDB() {
  try {
    db1 = await new sql.connect(configsv1);
    db2 = await new sql.connect(configsv2);
    db3 = await new sql.connect(configsv3);
    if (db1) {
      console.log(db1);
      console.log("Connect to Database 1 Successfully");
    }
    if (db2) {
      console.log(db2);
      console.log("Connect to Database 2 Successfully");
    }
    if (db3) {
      console.log(db3);
      console.log("Connect to Database 3 Successfully");
    }
  } catch (error) {
    console.log("Cannot connect to Database");
    console.log(error);
  }
}

async function getVuons(server) {
  let db = await selectDB(server);
  try {
    let Vuons = await db.request().query("SELECT * FROM Vuon");
    return Vuons.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getAdminById(user, server) {
  let { username, password } = user;
  let db = await selectDB(server);
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

async function findVuonById(id, server) {
  let db = await selectDB(server);
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

async function getKhuvuc(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from Khuvuc");
    let recordset = result.recordset;
    return recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getKhuvucByVungId(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from KhuVuc where VungId = @id");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getVung(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from Vung");
    let recordset = result.recordset;
    return recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getVuonByHTXId(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from Vuon where HTXId = @id");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getHopTacXaById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from HopTacXa where HTXId = @id");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function getKhuVucById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from KhuVuc where KhuVucId = @id");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function getThuHoachById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from ThuHoach where ThuHoachId = @id");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function getLoaiCayById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from LoaiCay where LoaiCayId = @id");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function getThuHoach(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from ThuHoach");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getThuHoachByVuonId(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from ThuHoach where VuonId = @id");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getHopTacXa(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from HopTacXa");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function editVuonById(form, id, server) {
  let { LoaiCayId, ChuVuonId, LoaiHinhDatDai, SoLuongCay, NgayGieoTrong } =
    form;
  let db = await selectDB(server);
  console.log(NgayGieoTrong);
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

async function editVungById(form, id, server) {
  let { tenvung, dientich } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .input("tenvung", sql.NVarChar, tenvung)
      .input("dientich", sql.Int, dientich)
      .query(
        "update Vung set TenVung = @tenvung, DienTich = @dientich where VungId = @id"
      );
    if (result) return result;
  } catch (error) {
    console.log(error);
  }
}

async function addVuon(form, server) {
  let {
    htxid,
    loaicayid,
    chuvuonid,
    loaihinhdatdai,
    soluongcay,
    ngaygieotrong,
  } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("htxid", sql.Int, htxid)
      .input("loaicayid", sql.Int, loaicayid)
      .input("chuvuonid", sql.Int, chuvuonid)
      .input("loaihinhdatdai", sql.NVarChar, loaihinhdatdai)
      .input("soluongcay", sql.Int, soluongcay)
      .input("ngaygieotrong", sql.Date, ngaygieotrong)
      .query(
        "insert into Vuon (HTXId,LoaiCayId,ChuVuonId,LoaiHinhDatDai,SoLuongCay,NgayGieoTrong) values (@htxid,@loaicayid,@chuvuonid,@loaihinhdatdai,@soluongcay,@ngaygieotrong)"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getLoaiCay(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from LoaiCay");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getChuVuon(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from ChuVuon");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function deleteHoptacxaById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from HopTacXa where HTXId = @id");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteKhuvucById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from KhuVuc where KhuVucId = @id");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteThuhoachById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from ThuHoach where ThuHoachId = @id");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteLoaiCayById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from LoaiCay where LoaiCayId = @id");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteVungById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("delete from Vung where VungId = @id");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addHopTacXa(form, server) {
  let { tenhtx, vitri, dientich, khuvucid } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("tenhtx", sql.NVarChar, tenhtx)
      .input("vitri", sql.NVarChar, vitri)
      .input("dientich", sql.Int, dientich)
      .input("khuvucid", sql.Int, khuvucid)
      .query(
        "insert into HopTacXa (TenHTX,Vitri,DienTich,KhuVucId) values (@tenhtx,@vitri,@dientich,@khuvucid)"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addKhuVuc(form, server) {
  let { tenkhuvuc, dientich, vungid } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("tenkhuvuc", sql.NVarChar, tenkhuvuc)
      .input("dientich", sql.Int, dientich)
      .input("vungid", sql.Int, vungid)
      .query(
        "insert into KhuVuc (TenKhuVuc,DienTich,VungId) values (@tenkhuvuc, @dientich, @vungid )"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addThuHoach(form, server) {
  let { vuonid, thoigianthuhoach, tongsanluong } = form;
  let db = await selectDB(server);
  try {
    console.log(vuonid, thoigianthuhoach, tongsanluong);
    const result = await db
      .request()
      .input("vuonid", sql.Int, vuonid)
      .input("thoigianthuhoach", sql.DateTime, thoigianthuhoach)
      .input("tongsanluong", sql.Int, tongsanluong)
      .query(
        "insert into ThuHoach (VuonId,ThoiGianThuHoach,TongSanLuong) values (@vuonid, @thoigianthuhoach, @tongsanluong )"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addLoaiCay(form, server) {
  let {
    tenloaicay,
    loaihinhdatdai,
    thoigianthichhopgieotrong,
    thoigiandukienthuhoach,
    tuoitho,
    nhietdothichhop,
  } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("tenloaicay", sql.NVarChar, tenloaicay)
      .input("loaihinh", sql.NVarChar, loaihinhdatdai)
      .input(
        "thoigianthichhopgieotrong",
        sql.VarChar,
        thoigianthichhopgieotrong
      )
      .input("thoigiandukienthuhoach", sql.VarChar, thoigiandukienthuhoach)
      .input("tuoitho", sql.Int, tuoitho)
      .input("nhietdothichhop", sql.Int, nhietdothichhop)
      .query(
        "insert into LoaiCay (TenLoaiCay,LoaiHinhDatDai,ThoiGianThichHopGieoTrong,ThoiGianDukienThuHoach,TuoiTho,NhietDoThichHop) values (@tenloaicay, @loaihinh, @thoigianthichhopgieotrong, @thoigiandukienthuhoach, @tuoitho, @nhietdothichhop)"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getMien(server) {
  let db = await selectDB(server);
  try {
    const result = await db.request().query("select * from Mien");
    let recordset = result.recordset;
    return recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addVung(form, server) {
  let { tenvung, dientich, mienid } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("tenvung", sql.NVarChar, tenvung)
      .input("dientich", sql.Int, dientich)
      .input("mienid", sql.VarChar, mienid)
      .query(
        "insert into Vung (TenVung,DienTich,MienId) values (@tenvung, @dientich, @mienid )"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function findVungById(id, server) {
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .query("select * from Vung where VungId = @id");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function editHoptacxaById(form, id, server) {
  let { tenhtx, vitri, dientich } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .input("tenhtx", sql.NVarChar, tenhtx)
      .input("vitri", sql.NVarChar, vitri)
      .input("dientich", sql.Int, dientich)
      .query(
        "update HopTacXa set TenHTX = @tenhtx, Vitri = @vitri, DienTich = @dientich where HTXId = @id"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editKhuvucById(form, id, server) {
  let { tenkhuvuc, dientich } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .input("tenkhuvuc", sql.NVarChar, tenkhuvuc)
      .input("dientich", sql.Int, dientich)
      .query(
        "update KhuVuc set TenkhuVuc = @tenkhuvuc, DienTich = @dientich where KhuVucId = @id"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editThuHoachById(form, id, server) {
  let { thoigianthuhoach, tongsanluong } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .input("thoigianthuhoach", sql.NVarChar, thoigianthuhoach)
      .input("tongsanluong", sql.Int, tongsanluong)
      .query(
        "update ThuHoach set ThoiGianThuHoach = @thoigianthuhoach, TongSanLuong = @tongsanluong where ThuHoachId = @id"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editLoaiCayById(form, id, server) {
  let {
    tenloaicay,
    loaihinhdatdai,
    thoigianthichhopgieotrong,
    thoigiandukienthuhoach,
    tuoitho,
    nhietdothichhop,
  } = form;
  let db = await selectDB(server);
  try {
    const result = await db
      .request()
      .input("id", sql.Int, id)
      .input("tenloaicay", sql.NVarChar, tenloaicay)
      .input("loaihinh", sql.NVarChar, loaihinhdatdai)
      .input(
        "thoigianthichhopgieotrong",
        sql.VarChar,
        thoigianthichhopgieotrong
      )
      .input("thoigiandukienthuhoach", sql.VarChar, thoigiandukienthuhoach)
      .input("tuoitho", sql.Int, tuoitho)
      .input("nhietdothichhop", sql.Int, nhietdothichhop)
      .query(
        "update LoaiCay set TenLoaiCay = @tenloaicay,LoaiHinhDatDai = @loaihinh,ThoiGianThichHopGieoTrong = @thoigianthichhopgieotrong,ThoiGianDukienThuHoach = @thoigiandukienthuhoach,TuoiTho = @tuoitho,NhietDoThichHop = @nhietdothichhop where LoaiCayId = @id"
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteVuon(id, server) {
  let db = await selectDB(server);
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
  getKhuvuc,
  getHopTacXaById,
  getVuonByHTXId,
  getVung,
  getKhuvucByVungId,
  getHopTacXa,
  getThuHoach,
  getThuHoachByVuonId,
  getLoaiCay,
  editVungById,
  findVungById,
  addVuon,
  getChuVuon,
  addHopTacXa,
  deleteHoptacxaById,
  editHoptacxaById,
  addKhuVuc,
  deleteKhuvucById,
  getKhuVucById,
  editKhuvucById,
  getMien,
  addVung,
  deleteVungById,
  addThuHoach,
  deleteThuhoachById,
  getThuHoachById,
  editThuHoachById,
  addLoaiCay,
  deleteLoaiCayById,
  getLoaiCayById,
  editLoaiCayById,
};
