const { getAdminById } = require("../../config/db/index");

class LoginController {
  async index(req, res, next) {
    res.render("login", {
      check: true,
    });
  }
  async login(req, res, next) {
    let { username, password } = req.body;
    if (!username || !password)
      return res.json({
        success: false,
        message: "missing username or password",
      });
    try {
      let authentication = await getAdminById({ username, password });
      if (!authentication)
        return res.json({
          success: false,
          message: "Incorrect username or password",
        });
      if (authentication.Password !== password)
        return res.json({
          success: false,
          message: "Incorrect username or password",
        });
      return res.redirect("/vuon?name=" + username);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LoginController();
