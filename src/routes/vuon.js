const express = require("express");
const router = express.Router();

const VuonController = require("../app/controllers/VuonController");

router.get("/:id/edit", VuonController.edit);
router.delete("/:id/delete", VuonController.deleteById);
router.get("/add", VuonController.addPage);
router.post("/add", VuonController.add);
router.put("/:id", VuonController.editById);
router.get("/:id", VuonController.showByHTXId);
router.get("/", VuonController.index);

module.exports = router;
