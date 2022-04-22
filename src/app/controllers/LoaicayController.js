const storeData = require("../../utils/StoreData");
const db = require("../../config/db/index");

class LoaicayController {
  async index(req, res, next) {
    try {
      let response = await db.getLoaiCay(storeData.server);
      res.render("loaicay/show", {
        loaicay: response,
        path: ["loaicay"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //[GET] /hoptacxa/:id
  async showById(req, res, next) {
    try {
      let response = await db.getHopTacXaById(req.params.id, storeData.server);
      return res.render("loaicay/show", {
        loaicay: response,
        path: ["loaicay"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /loaicay/add
  async addPage(req, res, next) {
    try {
      return res.render("loaicay/add");
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /loaicay/add
  async add(req, res, next) {
    let {
      tenloaicay,
      loaihinhdatdai,
      thoigianthichhopgieotrong,
      thoigiandukienthuhoach,
      tuoitho,
      nhietdothichhop,
    } = req.body;
    try {
      let response = await db.addLoaiCay(
        {
          tenloaicay,
          loaihinhdatdai,
          thoigianthichhopgieotrong,
          thoigiandukienthuhoach,
          tuoitho,
          nhietdothichhop,
        },
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/loaicay");
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /loaicay/:id/delete
  async deleteById(req, res, next) {
    try {
      let response = await db.deleteLoaiCayById(
        req.params.id,
        storeData.server
      );
      if (response) return res.redirect("/loaicay");
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /loaicay/:id/edit
  async editPage(req, res, next) {
    try {
      let response = await db.getLoaiCayById(req.params.id, storeData.server);
      if (!response) return res.redirect("back");
      return res.render("loaicay/edit", {
        loaicay: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /loaicay/:id
  async edit(req, res, next) {
    let {
      tenloaicay,
      loaihinhdatdai,
      thoigianthichhopgieotrong,
      thoigiandukienthuhoach,
      tuoitho,
      nhietdothichhop,
    } = req.body;
    try {
      let response = await db.editLoaiCayById(
        {
          tenloaicay,
          loaihinhdatdai,
          thoigianthichhopgieotrong,
          thoigiandukienthuhoach,
          tuoitho,
          nhietdothichhop,
        },
        req.params.id,
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/loaicay");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LoaicayController();
