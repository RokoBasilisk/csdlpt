const vuonRoute = require("./vuon");
const loginRoute = require("./login");
const homeRoute = require("./home");
const khuvucRoute = require("./khuvuc");
const hoptacxaRoute = require("./hoptacxa");
const vungRoute = require("./vung");
const thuhoachRoute = require("./thuhoach");
const loaicayRoute = require("./loaicay");

function route(app) {
  app.use("/vuon", vuonRoute);
  app.use("/admin", loginRoute);
  app.use("/home", homeRoute);
  app.use("/khuvuc", khuvucRoute);
  app.use("/hoptacxa", hoptacxaRoute);
  app.use("/vung", vungRoute);
  app.use("/thuhoach", thuhoachRoute);
  app.use("/loaicay", loaicayRoute);
}

module.exports = route;
