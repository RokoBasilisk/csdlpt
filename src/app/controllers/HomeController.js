const storeData = require("../../utils/StoreData");

class HomeController {
  index(req, res, next) {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  }
  select(req, res, next) {
    let { server } = req.body;
    try {
      storeData.server = server;
      return res.redirect("/vung");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new HomeController();
