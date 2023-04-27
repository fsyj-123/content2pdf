const express = require("express");
const exporter = require("./pdfExporter.js");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/server/generate", (req, res) => {
  let content = req.body.content;
  content = JSON.parse(content).content;
  if (content === undefined) {
    res.status(406).send({ message: "payload is required" });
  } else {
    exporter
      .generatePdf(content)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(406).send({ message: err.message });
      });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
