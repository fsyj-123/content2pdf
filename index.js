const express = require('express');
const exporter = require('pdfExporter');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/server/generate', (req, res) => {
    let content = req.body.content;
    content = JSON.parse(content)
    if (content.ai === undefined || content.human === undefined) {
        res.status(406).send({message: 'payload ai and human is required'});
    } else {
        exporter.generatePdf(content.ai, content.human).then(data => {
            res.status(200).send(data)
        })
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
