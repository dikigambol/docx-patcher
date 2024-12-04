const nomor_surat = "0032/S.Ked/R.0/2025";

const userData = [
  { user_id: "1", name: "Risa Santoso B.A M.D" },
  { user_id: "2", name: "Dr. Fathorrochman S.E, M.M" },
  { user_id: "3", name: "Darus Sinathrya" },
  { user_id: "4", name: "Dendik Sasongko Sasangkala" },
];

const ttdFileData = [
  {
    user_id: `1`,
    file: "test.png",
  },
  {
    user_id: `2`,
    file: "test.png",
  },
];

const qrData = [
  {
    label: `qr_1`,
    user_id: "1",
    rektor_id: "1",
    qr_type: "file",
    status: 0,
  },
  {
    label: `qr_2`,
    user_id: "2",
    rektor_id: "2",
    qr_type: "generate",
    status: 0,
  },
];

const tujuan = ["3","4"];

module.exports = {
  nomor_surat,
  userData,
  ttdFileData,
  qrData,
  tujuan,
};
