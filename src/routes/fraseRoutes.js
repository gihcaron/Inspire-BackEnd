const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/fraseController");

router.get("/", usuarioController.getFrases);
router.get("/:id", usuarioController.getFraseById);
router.post("/", usuarioController.createFrase);
router.put("/:id", usuarioController.updateFrase);
router.delete("/:id", usuarioController.deleteFrase);

module.exports = router;
