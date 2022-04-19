const express = require("express");
const router = express.Router();

const VuonController = require("../app/controllers/VuonController");

router.get("/", VuonController.index);
router.get("/:id/edit", VuonController.edit);
router.put("/:id", VuonController.editById);
router.delete("/:id/delete", VuonController.deleteById);

module.exports = router;
