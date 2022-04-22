const storeData = require("../../utils/StoreData");
const db = require("../../config/db/index");

class KhuvucController {
  async index(req, res, next) {
    try {
      let response = await db.getKhuvuc(storeData.server);
      res.render("khuvuc/show", {
        khuvuc: response,
        path: ["vung", "khuvuc"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async showByVungId(req, res, next) {
    try {
      let response = await db.getKhuvucByVungId(
        req.params.id,
        storeData.server
      );
      res.render("khuvuc/show", {
        khuvuc: response,
        path: ["vung", "khuvuc"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /khuvuc/add
  async addPage(req, res, next) {
    try {
      let vung = await db.getVung(storeData.server);
      return res.render("khuvuc/add", {
        vung: vung,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /khuvuc/add
  async add(req, res, next) {
    let { tenkhuvuc, dientich, vungid } = req.body;
    try {
      let response = await db.addKhuVuc(
        { tenkhuvuc, dientich, vungid },
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/khuvuc");
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /khuvuc/:id/delete
  async deleteById(req, res, next) {
    try {
      let response = await db.deleteKhuvucById(req.params.id, storeData.server);
      if (response) return res.redirect("/khuvuc");
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /khuvuc/:id/edit
  async editPage(req, res, next) {
    try {
      let response = await db.getKhuVucById(req.params.id, storeData.server);
      if (!response) return res.redirect("back");
      return res.render("khuvuc/edit", {
        khuvuc: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /khuvuc/:id
  async edit(req, res, next) {
    let { tenkhuvuc, dientich } = req.body;
    try {
      let response = await db.editKhuvucById(
        { tenkhuvuc, dientich },
        req.params.id,
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/khuvuc");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new KhuvucController();
