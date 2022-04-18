const express = require("express");
const router = express.Router();

const VuonController = require("../app/controllers/VuonController");

router.get("/", VuonController.index);

module.exports = router;
