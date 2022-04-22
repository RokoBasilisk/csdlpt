const storeData = require("../../utils/StoreData");
const db = require("../../config/db/index");

class HoptacxaController {
  async index(req, res, next) {
    try {
      let response = await db.getHopTacXa(storeData.server);
      res.render("hoptacxa/showOne", {
        htx: response,
        path: ["vung", "khuvuc", "hoptacxa"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //[GET] /hoptacxa/:id
  async showById(req, res, next) {
    try {
      let response = await db.getHopTacXaById(req.params.id, storeData.server);
      return res.render("hoptacxa/showOne", {
        htx: response,
        path: ["vung", "khuvuc", "hoptacxa"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /hoptacxa/add
  async addPage(req, res, next) {
    try {
      let khuvuc = await db.getKhuvuc(storeData.server);
      return res.render("hoptacxa/add", {
        khuvuc: khuvuc,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /hoptacxa/add
  async add(req, res, next) {
    let { tenhtx, vitri, dientich, khuvucid } = req.body;
    try {
      let response = await db.addHopTacXa(
        { tenhtx, vitri, dientich, khuvucid },
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/hoptacxa");
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /hoptacxa/:id/delete
  async deleteById(req, res, next) {
    try {
      let response = await db.deleteHoptacxaById(
        req.params.id,
        storeData.server
      );
      if (response) return res.redirect("/hoptacxa");
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /hoptacxa/:id/edit
  async editPage(req, res, next) {
    try {
      let response = await db.getHopTacXaById(req.params.id, storeData.server);
      if (!response) return res.redirect("back");
      return res.render("hoptacxa/edit", {
        htx: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /hoptacxa/:id
  async edit(req, res, next) {
    let { tenhtx, vitri, dientich } = req.body;
    try {
      let response = await db.editHoptacxaById(
        { tenhtx, vitri, dientich },
        req.params.id,
        storeData.server
      );
      if (!response) return res.redirect("back");
      return res.redirect("/hoptacxa");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new HoptacxaController();
