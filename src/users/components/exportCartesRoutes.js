const express = require("express");
const router = express.Router();
const { exportCartesPDF, exportCartesExcel } = require("../controllers/exportCartesController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/pdf", verifyToken, exportCartesPDF);
router.get("/excel", verifyToken, exportCartesExcel);

module.exports = router;
