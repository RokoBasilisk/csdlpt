const express = require("express");
const router = express.Router();

const HomeController = require("../app/controllers/HomeController");

router.post("/select", HomeController.select);
router.get("/", HomeController.index);

module.exports = router;
