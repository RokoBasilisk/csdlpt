const express = require("express");
const router = express.Router();

const KhuvucController = require("../app/controllers/KhuvucController");

router.delete("/:id/delete", KhuvucController.deleteById);
router.get("/:id/edit", KhuvucController.editPage);
router.put("/:id/", KhuvucController.edit);
router.get("/add", KhuvucController.addPage);
router.post("/add", KhuvucController.add);
router.get("/:id", KhuvucController.showByVungId);
router.get("/", KhuvucController.index);

module.exports = router;
