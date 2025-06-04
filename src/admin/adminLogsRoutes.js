const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// 📤 EXPORT EXCEL
router.get('/export/excel', protectAdmin, async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate('admin', 'email')
      .sort({ createdAt: -1 });

    const fields = ['createdAt', 'admin.email', 'action', 'contexte', 'ip'];
    const parser = new Parser({ fields });
    const csv = parser.parse(logs.map(log => ({
      createdAt: log.createdAt,
      'admin.email': log.admin?.email,
      action: log.action,
      contexte: log.contexte,
      ip: log.ip
    })));

    res.header('Content-Type', 'text/csv');
    res.attachment('logs_admin_gabkut.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Erreur export Excel' });
  }
});

// 📤 EXPORT PDF (résumé rapide)
router.get('/export/pdf', protectAdmin, async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate('admin', 'email')
      .sort({ createdAt: -1 });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '..', 'exports', `logs_admin_${Date.now()}.pdf`);

    // Si dossier exports n’existe pas, le créer
    if (!fs.existsSync(path.join(__dirname, '..', 'exports'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'exports'));
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('Journal des actions administrateur – Gabkut Pay', { align: 'center' });
    doc.moveDown();

    logs.slice(0, 50).forEach((log, i) => {
      doc
        .fontSize(10)
        .text(`${i + 1}. ${new Date(log.createdAt).toLocaleString()}`)
        .text(`👤 Admin : ${log.admin?.email || '—'}`)
        .text(`🧾 Action : ${log.action}`)
        .text(`📌 Contexte : ${log.contexte || '—'}`.slice(0, 120))
        .text(`🧠 IP : ${log.ip || '—'}`)
        .moveDown(0.5);
    });

    doc.end();

    stream.on('finish', () => {
      res.download(filePath, 'logs_admin_gabkut.pdf');
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur export PDF' });
  }
});
// 📊 STATS : Nombre d’actions par admin + par type
router.get('/stats', protectAdmin, async (req, res) => {
  try {
    const logs = await AdminLog.find().populate('admin', 'email');

    const stats = {
      total: logs.length,
      parAdmin: {},
      parAction: {},
      derniers7Jours: Array(7).fill(0),
    };

    const aujourdHui = new Date();
    logs.forEach(log => {
      const email = log.admin?.email || 'inconnu';
      stats.parAdmin[email] = (stats.parAdmin[email] || 0) + 1;

      stats.parAction[log.action] = (stats.parAction[log.action] || 0) + 1;

      const diff = Math.floor((aujourdHui - new Date(log.createdAt)) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff < 7) {
        stats.derniers7Jours[6 - diff]++;
      }
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Erreur chargement stats admin' });
  }
});
