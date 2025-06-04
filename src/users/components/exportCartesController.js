const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const path = require("path");
const VirtualCard = require("../models/VirtualCard");
const User = require("../models/User");

exports.exportCartesPDF = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartes = await VirtualCard.find({ userId });

    const doc = new PDFDocument();
    const filename = `cartes-${Date.now()}.pdf`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(20).text("Historique des Cartes Achetées", { align: "center" });
    doc.moveDown();

    cartes.forEach((carte, index) => {
      doc.fontSize(12).text(`${index + 1}. Carte : ${carte.type}`);
      doc.text(`Numéro : ${carte.numero}`);
      doc.text(`Plafond : $${carte.plafond || "N/A"}`);
      doc.text(`Date : ${new Date(carte.createdAt).toLocaleDateString()}`);
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("Erreur export PDF :", err);
    res.status(500).json({ message: "Erreur export PDF." });
  }
};

exports.exportCartesExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartes = await VirtualCard.find({ userId });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Cartes");

    sheet.columns = [
      { header: "Nom", key: "nom", width: 20 },
      { header: "Type", key: "type", width: 15 },
      { header: "Numéro", key: "numero", width: 25 },
      { header: "Plafond", key: "plafond", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    cartes.forEach((carte) => {
      sheet.addRow({
        nom: carte.nom || "Gabkut",
        type: carte.type,
        numero: carte.numero,
        plafond: carte.plafond || "N/A",
        date: new Date(carte.createdAt).toLocaleDateString(),
      });
    });

    const filename = `cartes-${Date.now()}.xlsx`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Erreur export Excel :", err);
    res.status(500).json({ message: "Erreur export Excel." });
  }
};
