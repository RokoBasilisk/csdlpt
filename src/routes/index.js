const vuonRoute = require("./vuon");
const loginRoute = require("./login");

function route(app) {
  app.use("/vuon", vuonRoute);
  app.use("/admin", loginRoute);
}

module.exports = route;
