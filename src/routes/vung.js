const express = require("express");
const router = express.Router();

const VungController = require("../app/controllers/VungController");

router.delete("/:id/delete", VungController.deleteById);
router.get("/add", VungController.addPage);
router.post("/add", VungController.add);
router.get("/:id/edit", VungController.editPage);
router.put("/:id", VungController.editByVungId);
router.get("/", VungController.showByVungId);

module.exports = router;
