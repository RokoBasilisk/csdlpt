const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const sql = require("mssql");

const route = require("./routes/index");
const { connectDB, getVuons } = require("./config/db/index");

connectDB();

const app = express();
const port = 5000;

app.use(morgan("tiny"));

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      increaseOne: (a) => {
        return a + 1;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
