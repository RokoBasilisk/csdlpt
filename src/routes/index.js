const vuonRoute = require("./vuon");

function route(app) {
  app.use("/vuon", vuonRoute);
}

module.exports = route;
