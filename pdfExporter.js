// Import the pdfmake library
const PdfPrinter = require("pdfmake");
const style = require("./style.js");

const fontDescription = {
  Han: {
    normal: "./fonts/SourceHanSerifSC-VF.ttf",
  },
  Roboto: {
    normal: "./fonts/Roboto-Regular.ttf",
    bold: "./fonts/Roboto-Medium.ttf",
    italics: "./fonts/Roboto-Italic.ttf",
    bolditalics: "./fonts/Roboto-MediumItalic.ttf",
  },
};

const printer = new PdfPrinter(fontDescription);
// Define a function to generate the PDF document
function generatePdf(conversations) {
  // Define the content of the PDF document
  const content = [];

  conversations.sort((a, b) => {
    return b.index - a.index;
  });

  // 根据 position 进行Content赋值
  conversations.forEach((item) => {
    item.data.style.push("chatbox");
    item.data.style.push(item.position === 0 ? "left" : "right");
  });

  // Iterate over the arrays and add the questions and answers to the content
  conversations.forEach((item) => {
    content.push(item.data);
  });

  // Define the document definition
  const documentDefinition = {
    content: content,
    styles: style,
  };

  return new Promise((resolve, reject) => {
    // Generate the PDF document and convert it to byte array
    let doc = printer.createPdfKitDocument(documentDefinition);
    let chunks = [];
    doc.on("data", function (chunk) {
      chunks.push(chunk);
    });
    doc.on("end", function () {
      try {
        let result = Buffer.concat(chunks);
        // result is a buffer array of the generated PDF
        resolve(result.toString("base64"));
      } catch (e) {
        reject("unsupport document definetion");
      }
    });
    doc.end();
  });
}

module.exports = { generatePdf };
