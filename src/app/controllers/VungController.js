const storeData = require("../../utils/StoreData");
const db = require("../../config/db/index");

class VungController {
  // [GET] /vung/:id
  async showByVungId(req, res, next) {
    try {
      let response = await db.getVung(storeData.server);
      res.render("vung/showOne", {
        vung: response,
        path: ["vung"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /vung/:id/edit
  async editByVungId(req, res, next) {
    const { tenvung, dientich } = req.body;
    try {
      let response = await db.editVungById(
        { tenvung, dientich },
        req.params.id,
        storeData.server
      );
      if (response) res.redirect("/vung");
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /vung/
  async editPage(req, res, next) {
    try {
      let response = await db.findVungById(req.params.id, storeData.server);
      res.render("vung/edit", {
        vung: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /vung/add
  async addPage(req, res, next) {
    try {
      let mien = await db.getMien(storeData.server);
      return res.render("vung/add", {
        mien: mien,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /vung/add
  async add(req, res, next) {
    let { tenvung, dientich, mienid } = req.body;
    try {
      let response = await db.addVung(
        { tenvung, dientich, mienid },
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/vung");
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /vung/:id/delete
  async deleteById(req, res, next) {
    try {
      let response = await db.deleteVungById(req.params.id, storeData.server);
      if (response) return res.redirect("/vung");
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /vung/:id
  async edit(req, res, next) {
    let { tenkhuvuc, dientich } = req.body;
    try {
      let response = await db.editKhuvucById(
        { tenkhuvuc, dientich },
        req.params.id,
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/vung");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VungController();
