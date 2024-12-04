const { PatchType, TextRun, patchDocument } = require("docx");
const fsAsync = require("fs").promises;
const fs = require("fs");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);
const { PDFDocument } = require("pdf-lib");

const patchDocx = async (
  docxFilePath,
  tempDocxPath,
  generateSum,
  list_tujuan,
  patches
) => {
  const ext = ".pdf";
  try {
    if (generateSum && list_tujuan.length > 1) {
      const pdfBuffers = [];

      for (let i = 0; i < list_tujuan.length; i++) {
        const docxBuffer = await patchDocument({
          outputType: "nodebuffer",
          data: fs.readFileSync(docxFilePath),
          patches: {
            ...patches,
            nama_tujuan: {
              type: PatchType.PARAGRAPH,
              children: [new TextRun(list_tujuan[i])],
            },
          },
        });

        fs.writeFileSync(tempDocxPath, docxBuffer);

        const docxBuf = await fsAsync.readFile(tempDocxPath);

        const pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

        pdfBuffers.push(pdfBuf);
        fs.unlinkSync(tempDocxPath);
      }

      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < pdfBuffers.length; i++) {
        const pdfDoc = await PDFDocument.load(pdfBuffers[i]);
        const pages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBuffer = await mergedPdf.save();
      return mergedPdfBuffer;
    }

    const docxBuffer = await patchDocument({
      outputType: "nodebuffer",
      data: fs.readFileSync(docxFilePath),
      patches: {
        ...patches,
        nama_tujuan: {
          type: PatchType.PARAGRAPH,
          children: [new TextRun(list_tujuan[0])],
        },
      },
    });

    fs.writeFileSync(tempDocxPath, docxBuffer);

    const docxBuf = await fsAsync.readFile(tempDocxPath);

    const pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

    fs.unlinkSync(tempDocxPath);

    return pdfBuf;
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw error;
  }
};

module.exports = patchDocx;
