// Import the pdfmake library
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define a function to generate the PDF document
function generatePdf(humanQuestions, aiAnswers) {
    // Define the content of the PDF document
    const content = [];

    // Iterate over the arrays and add the questions and answers to the content
    for (let i = 0; i < humanQuestions.length; i++) {
        const humanQuestion = humanQuestions[i];
        const aiAnswer = aiAnswers[i];

        // Define the styles for the text
        const styles = {
            left: {
                alignment: "left",
                font: "Arial",
                fontSize: 12,
                color: "#333",
                margin: [0, 2, 0, 2],
            },
            right: {
                alignment: "right",
                font: "Arial",
                fontSize: 12,
                color: "#333",
                margin: [0, 2, 0, 2],
            },
            question: {
                bold: true,
                color: "#555",
            },
            answer: {
                color: "#333",
            },
            chatbox: {
                margin: [0, 20, 0, 0],
                padding: [10],
                border: [1],
                borderColor: "#ccc",
                borderRadius: 5,
            },
        };

        // Add the human question and AI answer to the content
        content.push({
            columns: [
                {
                    text: humanQuestion,
                    style: ["question", "chatbox"],
                    width: "80%",
                },
                {
                    text: aiAnswer,
                    style: ["answer", "chatbox"],
                    width: "80%",
                },
            ],
            margin: [0, 5],
        });
    }

    // Define the document definition
    const documentDefinition = {
        content: content,
    };

    return new Promise((resolve, reject) => {
        function retrieveData(data) {
            resolve(data)
        }

        // Generate the PDF document and convert it to byte array
        pdfMake.createPdf(documentDefinition).getBuffer(retrieveData)
    });

}


export {generatePdf};
