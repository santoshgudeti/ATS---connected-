/*const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdf: { type: Buffer, required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PdfDetails", PdfDetailsSchema); */
const mongoose = require("mongoose");

const pdfDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdf: { type: Buffer, required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const PdfDetails = mongoose.model("PdfDetails", pdfDetailsSchema);
module.exports = PdfDetails;
