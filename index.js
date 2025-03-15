const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");
const app = express();
const PORT = 7001;

const upload = multer({ dest: "uploads/" });

// csv to json route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", () => {
      fs.unlinkSync(req.file.path);
      res.json(results);
    })
    .on("error", (err) => res.status(500).json({ error: err.message }));
});

// json to csv file
app.get("/download", (req, res) => {
  const sampleData = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Doe", age: 25, city: "Los Angeles" },
  ];

  const json2csvParser = new Parser();
  const csvData = json2csvParser.parse(sampleData);

  res.setHeader("Content-Disposition", "attachment; filename=data.csv");
  res.setHeader("Content-Type", "text/csv");
  res.status(200).send(csvData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
