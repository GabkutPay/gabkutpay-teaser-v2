const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const AdminLog = require('../models/AdminLog');
const path = require('path');
const fs = require('fs');

router.get('/admin/logs/export-pdf', async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .sort({ date: -1 })
      .populate('adminId', 'nom prenom email');

    // Activer le buffering pour pagination
    const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });

    const filename = `admin-logs-${Date.now()}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    // Logo Gabkut si disponible
    const logoPath = path.join(__dirname, '../assets/logo-gabkut.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 50 });
    }

    doc.fontSize(16).text('Gabkut Pay – Département Sécurité', 110, 57);
    doc.moveDown();

    doc.fontSize(11).text(`📅 Date de génération : ${new Date().toLocaleString()}`);
    doc.moveDown();

    // En-tête tableau
    doc.font('Helvetica-Bold').fontSize(12).text('Journaux des actions critiques', { underline: true });
    doc.moveDown(0.5);

    // Colonnes
    const tableTop = doc.y;
    const itemHeight = 20;
    const colWidths = {
      index: 30,
      date: 120,
      admin: 120,
      action: 180,
      ip: 100,
      device: 100,
    };

    // Entête colonnes
    doc.fontSize(10).text('#', 50, tableTop);
    doc.text('Date', 50 + colWidths.index, tableTop);
    doc.text('Admin', 50 + colWidths.index + colWidths.date, tableTop);
    doc.text('Action', 50 + colWidths.index + colWidths.date + colWidths.admin, tableTop);
    doc.text('IP', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action, tableTop);
    doc.text('Device', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action + colWidths.ip, tableTop);

    doc.moveDown();

    // Corps du tableau
    let y = tableTop + itemHeight;
    logs.forEach((log, i) => {
      if (y > doc.page.height - 50) {
        doc.addPage();
        y = 50;

        // Réafficher en-tête sur nouvelle page
        doc.fontSize(10).text('#', 50, y);
        doc.text('Date', 50 + colWidths.index, y);
        doc.text('Admin', 50 + colWidths.index + colWidths.date, y);
        doc.text('Action', 50 + colWidths.index + colWidths.date + colWidths.admin, y);
        doc.text('IP', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action, y);
        doc.text('Device', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action + colWidths.ip, y);
        y += itemHeight;
      }
      const date = new Date(log.date).toLocaleString();
      const admin = log.adminId ? `${log.adminId.nom || ''} ${log.adminId.prenom || ''}`.trim() : 'Inconnu';

      doc.font('Helvetica').fontSize(9);
      doc.text(i + 1, 50, y, { width: colWidths.index });
      doc.text(date, 50 + colWidths.index, y, { width: colWidths.date });
      doc.text(admin, 50 + colWidths.index + colWidths.date, y, { width: colWidths.admin });
      doc.text(log.action, 50 + colWidths.index + colWidths.date + colWidths.admin, y, { width: colWidths.action });
      doc.text(log.ip || '-', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action, y, { width: colWidths.ip });
      doc.text(log.device || '-', 50 + colWidths.index + colWidths.date + colWidths.admin + colWidths.action + colWidths.ip, y, { width: colWidths.device });

      y += itemHeight;
    });

    doc.moveDown(2);
    doc.fontSize(11).text("Signature de l'administrateur :", { align: 'left' });
    doc.moveDown(2);
    doc.text("__________________________", { align: 'left' });
    doc.moveDown();
    doc.fontSize(9).fillColor('gray')
      .text(`Document généré automatiquement et signé numériquement – ID: LOG-${Date.now()}`, {
        align: 'center',
      });

    // Badge sécurisé
    const badgePath = path.join(__dirname, '../assets/badge-secure.png');
    if (fs.existsSync(badgePath)) {
      doc.image(badgePath, 450, 40, { width: 80 });
    }

    // Filigrane "CONFIDENTIEL" sur chaque page
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      doc.save();
      doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
      doc.fontSize(60).fillColor('gray').opacity(0.08);
      doc.text("CONFIDENTIEL", doc.page.width / 4, doc.page.height / 2, { align: 'center', width: doc.page.width });
      doc.restore();
    }

    // Cachet officiel Gabkut (en bas à droite)
    const cachetPath = path.join(__dirname, '../assets/cachet-gabkut.png');
    if (fs.existsSync(cachetPath)) {
      doc.image(cachetPath, doc.page.width - 150, doc.page.height - 100, { width: 120, opacity: 0.4 });
    }

    // Pagination
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(9).fillColor('gray')
        .text(`Page ${i + 1} sur ${range.count}`, doc.page.width - 100, doc.page.height - 30, { align: 'right' });
    }

    doc.end();
  } catch (err) {
    console.error("Erreur export PDF logs :", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erreur export PDF" });
    }
  }
});

module.exports = router;
