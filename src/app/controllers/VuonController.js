const Vuon = require("../models/Vuon");

const { getVuons } = require("../../config/db/index");

class VuonController {
  async index(req, res, next) {
    try {
      let records = await getVuons();
      res.render("login", {
        records: records[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VuonController();
