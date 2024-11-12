
# PDF Invoice Generator

This project is a Node.js and Express application that generates PDF invoices using data from a POST request.

## Features

- Generate PDF invoices based on dynamic data sent in the request body.
- Caches previously generated PDFs to reduce duplicate file creation.
- Uses EJS for templating and Puppeteer for rendering HTML to PDF.
- Ensures generated PDFs are unique by hashing the request data.

## Technologies

- **Node.js**: Server-side runtime for handling requests.
- **Express**: Web framework for routing and middleware.
- **Puppeteer**: Renders HTML to PDF format.
- **EJS**: Template engine for dynamic HTML generation.
- **fs-extra**: File system utilities for managing directories and files.
- **Crypto**: Used to create unique filenames based on request data.

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdf-invoice-generator.git
   cd pdf-invoice-generator

2. **Install dependencies**

   ```bash
   npm install


3. **Run the application**

   ```bash
   node app.js

The server will start on http://localhost:3000.

**Usage**

	Endpoint: /generate-pdf
	Method: POST
	Request Body: JSON object containing the data needed for the invoice, such as seller, buyer, items, etc.

**Example:**

  ```bash
  {
    "seller": "ABC Corporation",
    "sellerAddress": "123 Main St, City",
    "sellerGstin": "12345ABC",
    "buyer": "XYZ Ltd.",
    "buyerAddress": "456 High St, City",
    "buyerGstin": "67890XYZ",
    "items": [
        { "name": "Item 1", "quantity": 2, "rate": 10.5, "amount": 21.0 },
        { "name": "Item 2", "quantity": 1, "rate": 15.0, "amount": 15.0 }
    ]
  }
  ```


The generated PDF can then be downloaded directly from the server.

**Directory Structure**

	templates/: Contains the invoice.ejs template file.
	generated-pdfs/: Stores generated PDFs to avoid redundant creation.
