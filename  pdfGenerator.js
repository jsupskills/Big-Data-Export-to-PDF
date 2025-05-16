// pdfGenerator.js
const PDFDocument = require('pdfkit');
const { generateFakeUsers } = require('./dataGenerator');

async function generatePdfStream(outputStream) {
  const doc = new PDFDocument({ margin: 30, size: 'A4', autoFirstPage: true });

  // Pipe PDF to output stream (res object)
  doc.pipe(outputStream);

  doc.fontSize(20).text('User Data Export', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('ID | Name | Email | City');
  doc.moveDown(0.5);

  const MAX_ROWS = 50000; // You can tweak this
  let rowCount = 0;

  for (const user of generateFakeUsers()) {
    const row = `${user.id} | ${user.name} | ${user.email} | ${user.city}`;
    doc.text(row);

    rowCount++;

    if (rowCount % MAX_ROWS === 0) {
      // Optional: Flush to disk or monitor memory here
      await new Promise((resolve) => setImmediate(resolve)); // Yield
    }

    if (doc.y > doc.page.height - 50) {
      doc.addPage();
    }
  }

  doc.on('error', (err) => {
  console.error('PDF Error:', err);
});

doc.on('finish', () => {
  console.log('PDF writing done!');
});

  doc.end(); // Finalize the PDF stream
}

module.exports = { generatePdfStream };
