const Vuon = require("../models/Vuon");

const {
  getVuons,
  editVuonById,
  findVuonById,
  deleteVuon,
} = require("../../config/db/index");

class VuonController {
  //[GET] /vuon/
  async index(req, res, next) {
    let name = req.query.name;
    console.log(name);
    try {
      let records = await getVuons();
      let path = ["vuon"];
      res.render("vuon/show", {
        records: records[0],
        name: name,
        path: path,
      });
    } catch (error) {
      next(error);
    }
  }

  //[GET] /vuon/:id/edit
  async edit(req, res, next) {
    let id = req.params.id;
    try {
      let record = await findVuonById(id);
      res.render("vuon/edit", record);
    } catch (error) {
      console.log(error);
    }
  }

  //[PUT] /vuon/:id
  async editById(req, res, next) {
    let id = req.params.id;
    let response = await editVuonById(req.body, id);
    if (!response) return res.redirect("back");
    return res.redirect("/vuon");
  }

  //[DELETE] /vuon/:id/delete
  async deleteById(req, res, next) {
    let id = req.params.id;
    try {
      let response = await deleteVuon(id);
      if (!response) return res.direct("back");
      return res.redirect("/vuon");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VuonController();
