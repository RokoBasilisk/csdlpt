const storeData = require("../../utils/StoreData");
const Vuon = require("../models/Vuon");
const {
  getVuons,
  editVuonById,
  findVuonById,
  deleteVuon,
  getVuonByHTXId,
  addVuon,
  getHopTacXa,
  getLoaiCay,
  getChuVuon,
} = require("../../config/db/index");

class VuonController {
  //[GET] /vuon/
  async index(req, res, next) {
    let name = req.query.name;
    try {
      let records = await getVuons(storeData.server);
      res.render("vuon/show", {
        records: records,
        name: name,
        path: ["vung", "khuvuc", "hoptacxa", "vuon"],
      });
    } catch (error) {
      next(error);
    }
  }

  //[GET] /vuon/:id
  async showByHTXId(req, res, next) {
    try {
      let response = await getVuonByHTXId(req.params.id, storeData.server);
      return res.render("vuon/showOne", {
        vuon: response,
        path: ["vung", "khuvuc", "hoptacxa", "vuon"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //[GET] /vuon/:id/edit
  async edit(req, res, next) {
    let id = req.params.id;
    try {
      let record = await findVuonById(id, storeData.server);
      res.render("vuon/edit", record);
    } catch (error) {
      console.log(error);
    }
  }

  //[PUT] /vuon/:id
  async editById(req, res, next) {
    let id = req.params.id;
    let response = await editVuonById(req.body, id, storeData.server);
    if (!response) return res.redirect("back");
    return res.redirect("/vuon");
  }

  // [GET] /vuon/add
  async addPage(req, res, next) {
    let response = await getHopTacXa(storeData.server);
    let tree = await getLoaiCay(storeData.server);
    let chuvuon = await getChuVuon(storeData.server);
    return res.render("vuon/add", {
      htx: response,
      loaicay: tree,
      chuvuon: chuvuon,
    });
  }

  //[POST] /vuon/add
  async add(req, res, next) {
    const {
      htxid,
      loaicayid,
      chuvuonid,
      loaihinhdatdai,
      soluongcay,
      ngaygieotrong,
    } = req.body;
    try {
      let response = await addVuon(
        {
          htxid,
          loaicayid,
          chuvuonid,
          loaihinhdatdai,
          soluongcay,
          ngaygieotrong,
        },
        storeData.server
      );
      return res.redirect("/vuon");
    } catch (error) {
      console.log(error);
    }
  }

  //[DELETE] /vuon/:id/delete
  async deleteById(req, res, next) {
    let id = req.params.id;
    try {
      let response = await deleteVuon(id, storeData.server);
      if (!response) return res.direct("back");
      return res.redirect("/vuon");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VuonController();
