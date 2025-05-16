const express = require('express');
const { generatePdfStream } = require('./ pdfGenerator');

const app = express();

app.get('/export-pdf', async (req, res) => {
  try {
    req.setTimeout(0); // disable timeout
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=bigdata.pdf');
    await generatePdfStream(res);
  } catch (err) {
    console.error('Error exporting PDF:', err);
    res.status(500).send('Something went wrong');
  }
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});