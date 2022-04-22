const express = require("express");
const router = express.Router();

const LoaicayController = require("../app/controllers/LoaicayController");

router.delete("/:id/delete", LoaicayController.deleteById);
router.get("/:id/edit", LoaicayController.editPage);
router.put("/:id/", LoaicayController.edit);
router.get("/add", LoaicayController.addPage);
router.post("/add", LoaicayController.add);
router.get("/:id", LoaicayController.showById);
router.get("/", LoaicayController.index);

module.exports = router;
