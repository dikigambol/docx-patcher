const fs = require("fs");
const generateQr = require("./generate-qr");
const { PatchType, ImageRun, TextRun } = require("docx");

const usePatchTTD = (qrData, userData, ttdFileData) => {
  let ttdMerged = [];

  const nama = "John Doe";
  const alamat = "Jl. Contoh No. 123, Jakarta";
  const umur = "30 tahun";

  const qrMeta = `Nama: ${nama}\nAlamat: ${alamat}\nUmur: ${umur}`;

  ttdMerged = qrData.map((qr_item) => {
    const ttd_file = ttdFileData.find(
      (item) => item.user_id === qr_item.user_id
    );
    const user_data = userData.find((item) => item.user_id === qr_item.user_id);
    if (qr_item.qr_type === "file" && ttd_file) {
      return {
        ...qr_item,
        nama: user_data.name,
        qr_code: fs.readFileSync(ttd_file.file),
      };
    } else {
      return {
        ...qr_item,
        nama: user_data.name,
        qr_code: generateQr(qrMeta),
      };
    }
  });

  const patchTTD = ttdMerged.map((item) => {
    return {
      [item.label]: {
        type: PatchType.PARAGRAPH,
        children: [
          new ImageRun({
            data: item.qr_code,
            transformation: { width: 100, height: 100 },
          }),
        ],
      },
    };
  });

  const patchNamaTTD = ttdMerged.map((item, i) => {
    return {
      [`penandatangan_${i + 1}`]: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(item.nama)],
      },
    };
  });

  return {
    patchTTD,
    patchNamaTTD,
  };
};

module.exports = usePatchTTD;
