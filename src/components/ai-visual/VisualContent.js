// models/VisualContent.js
const mongoose = require('mongoose');

const VisualContentSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // texte, couleurs, objets JSON
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VisualContent', VisualContentSchema);
