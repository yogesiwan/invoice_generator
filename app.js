const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const crypto = require('crypto');

const app = express();
app.use(express.json());
const PORT = 3000;

// Directory for storing PDFs
const pdfDir = path.join(__dirname, 'generated-pdfs');
fs.ensureDirSync(pdfDir); // Ensure directory exists

// Utility to generate a unique filename based on input data hash
const generateFileName = (data) => {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex') + '.pdf';
};

// Route to generate and download PDF
app.post('/generate-pdf', async (req, res) => {
    const data = req.body;
    const pdfName = generateFileName(data);
    const pdfPath = path.join(pdfDir, pdfName);

    // Check if PDF already exists
    if (await fs.pathExists(pdfPath)) {
        // Send the existing PDF for download without regenerating
        return res.download(pdfPath, pdfName, (err) => {
            if (err) {
                console.error("Error downloading PDF:", err);
                res.status(500).send("Error downloading PDF");
            }
        });
    }

    try {
        // Render HTML content using EJS template
        const html = await ejs.renderFile(path.join(__dirname, 'templates', 'invoice.ejs'), data);

        // Launch Puppeteer and generate PDF from HTML
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({ path: pdfPath, format: 'A4' });
        await browser.close();

        // Save to disk and send the new PDF for download
        res.download(pdfPath, pdfName, (err) => {
            if (err) {
                console.error("Error downloading PDF:", err);
                res.status(500).send("Error downloading PDF");
            }
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});