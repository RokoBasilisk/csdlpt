const storeData = require("../../utils/StoreData");
const db = require("../../config/db/index");

class ThuhoachController {
  async index(req, res, next) {
    try {
      let response = await db.getThuHoach(storeData.server);
      res.render("thuhoach/show", {
        thuhoach: response,
        path: ["vung", "khuvuc", "hoptacxa", "vuon", "thuhoach"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //[GET] /thuhoach/:id
  async showById(req, res, next) {
    try {
      let response = await db.getThuHoachByVuonId(
        req.params.id,
        storeData.server
      );
      return res.render("thuhoach/show", {
        thuhoach: response,
        path: ["vung", "khuvuc", "hoptacxa", "vuon", "thuhoach"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /thuhoach/add
  async addPage(req, res, next) {
    try {
      let vuon = await db.getVuons(storeData.server);
      return res.render("thuhoach/add", {
        vuon: vuon,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /thuhoach/add
  async add(req, res, next) {
    let { vuonid, thoigianthuhoach, tongsanluong } = req.body;
    try {
      let response = await db.addThuHoach(
        { vuonid, thoigianthuhoach, tongsanluong },
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/thuhoach");
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /thuhoach/:id/delete
  async deleteById(req, res, next) {
    try {
      let response = await db.deleteThuhoachById(
        req.params.id,
        storeData.server
      );
      if (response) return res.redirect("/thuhoach");
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /thuhoach/:id/edit
  async editPage(req, res, next) {
    try {
      let response = await db.getThuHoachById(req.params.id, storeData.server);
      if (!response) return res.redirect("back");
      return res.render("thuhoach/edit", {
        thuhoach: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /thuhoach/:id
  async edit(req, res, next) {
    let { thoigianthuhoach, tongsanluong } = req.body;
    try {
      let response = await db.editThuHoachById(
        { thoigianthuhoach, tongsanluong },
        req.params.id,
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/thuhoach");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ThuhoachController();
