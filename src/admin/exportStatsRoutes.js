// routes/admin/exportStatsRoutes.js
const express = require("express");
const router = express.Router();
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Exemple : fausse fonction de données statistiques
const getStatistiques = async (debut, fin) => {
  return [
    { date: debut, revenus: 430, envois: 15, retraits: 10 },
    { date: fin, revenus: 710, envois: 22, retraits: 17 }
  ];
};

// 📁 GET /api/admin/export-stats/pdf
router.get("/pdf", async (req, res) => {
  try {
    const { debut, fin } = req.query;
    const stats = await getStatistiques(debut, fin);

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, "../../exports/statistiques.pdf");
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(16).text("Statistiques Gabkut Pay", { align: "center" });
    doc.moveDown();

    stats.forEach(stat => {
      doc.fontSize(12).text(`Date : ${stat.date}`);
      doc.text(`Revenus : $${stat.revenus}`);
      doc.text(`Envois : ${stat.envois}`);
      doc.text(`Retraits : ${stat.retraits}`);
      doc.moveDown();
    });

    doc.end();
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: "Erreur export PDF", err });
  }
});

// 📁 GET /api/admin/export-stats/excel
router.get("/excel", async (req, res) => {
  try {
    const { debut, fin } = req.query;
    const stats = await getStatistiques(debut, fin);

    const fields = ["date", "revenus", "envois", "retraits"];
    const parser = new Parser({ fields });
    const csv = parser.parse(stats);

    const filePath = path.join(__dirname, "../../exports/statistiques.csv");
    fs.writeFileSync(filePath, csv);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: "Erreur export Excel", err });
  }
});

module.exports = router;
