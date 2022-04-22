const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sql = require("mssql");
const methodOverride = require("method-override");

const storeData = require("./utils/StoreData");
const route = require("./routes/index");

const app = express();
const port = 5000;

app.use(morgan("tiny"));

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      increaseOne: (a) => {
        return a + 1;
      },
      convertToJSDateTime: (time) => {
        let datetime = new Date(time);
        let dd = datetime.getDate().toString().padStart(2, "0");
        let mm = (datetime.getMonth() + 1).toString().padStart(2, "0");
        let yy = datetime.getFullYear().toString().padStart(2, "0");
        return `${yy}-${mm}-${dd}`;
      },
      emptyOrNot: (str) => {
        return str ? str : "Chưa Có Dữ Liệu";
      },
      getActivePath: (paths, str) => {
        if (paths) {
          let lastPath = paths[paths.length - 1];
          return lastPath == str ? "active" : "";
        } else return "";
      },
      getSoilsType: (loaicays) => {
        let Soils = [];
        if (loaicays) {
          loaicays.map((vuon) => {
            Soils.push(vuon.LoaiHinhDatDai);
          });
        }
        let uniqueSoilsType = [...new Set(Soils)];
        return uniqueSoilsType;
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
