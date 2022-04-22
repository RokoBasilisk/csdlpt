const express = require("express");
const router = express.Router();

const HoptacxaController = require("../app/controllers/HoptacxaController");

router.delete("/:id/delete", HoptacxaController.deleteById);
router.get("/:id/edit", HoptacxaController.editPage);
router.put("/:id/", HoptacxaController.edit);
router.get("/add", HoptacxaController.addPage);
router.post("/add", HoptacxaController.add);
router.get("/:id", HoptacxaController.showById);
router.get("/", HoptacxaController.index);

module.exports = router;
