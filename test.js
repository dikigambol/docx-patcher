const fs = require('fs');
const { TextRun, ImageRun, patchDocument, PatchType } = require('docx');

patchDocument({
  outputType: "nodebuffer",
  data: fs.readFileSync("skj.docx"),
  patches: {
    nomor_surat: {
      type: PatchType.PARAGRAPH,
      children: [
        new TextRun("replaced just as"),
      ],
    },
    tanda_tangan: {
      type: PatchType.PARAGRAPH,
      children: [
        new ImageRun({
          type: "jpg",
          data: fs.readFileSync("test.png"),
          transformation: { width: 100, height: 100 },
        }),
      ],
    },
  },
}).then((doc) => {
  fs.writeFileSync("My Document.docx", doc);
});
