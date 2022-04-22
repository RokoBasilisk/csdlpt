const express = require("express");
const router = express.Router();

const ThuhoachController = require("../app/controllers/ThuhoachController");

router.delete("/:id/delete", ThuhoachController.deleteById);
router.get("/:id/edit", ThuhoachController.editPage);
router.put("/:id/", ThuhoachController.edit);
router.get("/add", ThuhoachController.addPage);
router.post("/add", ThuhoachController.add);
router.get("/:id", ThuhoachController.showById);
router.get("/", ThuhoachController.index);

module.exports = router;
