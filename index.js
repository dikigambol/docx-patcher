const express = require("express");
const { TextRun, PatchType } = require("docx");
const path = require("path");
const {
  qrData,
  userData,
  ttdFileData,
  nomor_surat,
  tujuan,
} = require("./_mocks_/_data_");
const generateRandomFileName = require("./utils/generate-random-namefiles");
const patchDocx = require("./utils/patch-docx");
const usePatchTTD = require("./utils/generate-patch-ttd");
const generateNameReceiver = require("./utils/generate-name-receiver");

const app = express();
const port = 3603;

app.get("/docx-preview/:generate_sum?", async (req, res) => {
  const generateSum = req.params.generate_sum === "true";
  const docxFilePath = path.join(__dirname, "surat_keterangan_kerja.docx");
  const tempDocxPath = path.join(__dirname, `${generateRandomFileName()}.docx`);

  try {
    const { patchTTD, patchNamaTTD } = usePatchTTD(
      qrData,
      userData,
      ttdFileData
    );

    const list_tujuan = generateNameReceiver(userData, tujuan);

    const pdfBuf = await patchDocx(
      docxFilePath,
      tempDocxPath,
      generateSum,
      list_tujuan,
      {
        nomor_surat: {
          type: PatchType.PARAGRAPH,
          children: [new TextRun(nomor_surat)],
        },
        ...patchTTD.reduce((acc, patch) => ({ ...acc, ...patch }), {}),
        ...patchNamaTTD.reduce((acc, patch) => ({ ...acc, ...patch }), {}),
      }
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="generated-document.pdf"`
    );

    res.end(pdfBuf);
  } catch (err) {
    console.error("Error patch docx:", err);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
