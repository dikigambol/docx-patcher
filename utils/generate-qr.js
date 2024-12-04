const QRCode = require("qrcode");

const generateQr = async (qrMeta) => {
  const qrCodeBuffer = await QRCode.toBuffer(qrMeta);
  return qrCodeBuffer;
};

module.exports = generateQr;
