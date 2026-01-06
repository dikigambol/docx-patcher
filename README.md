# DOCX Patcher

Proyek ini adalah server Express sederhana yang digunakan untuk menghasilkan preview surat keterangan kerja dalam format PDF. Server ini mengambil template DOCX, menambahkan data dinamis seperti nomor surat, nama penerima, tanda tangan, dan QR code, lalu mengonversinya menjadi PDF.

## Fitur

- **Patching DOCX**: Mengganti placeholder dalam file DOCX dengan data dinamis menggunakan library `docx`.
- **Generate QR Code**: Membuat QR code otomatis berdasarkan data yang diberikan.
- **Tambah Tanda Tangan**: Menambahkan gambar tanda tangan ke dalam dokumen.
- **Konversi ke PDF**: Menggunakan LibreOffice untuk mengonversi file DOCX yang telah di-patch menjadi PDF.
- **Merge PDF**: Jika ada multiple penerima, server dapat menggabungkan beberapa PDF menjadi satu file.
- **Endpoint API**: Menyediakan endpoint `/docx-preview/:generate_sum?` untuk menghasilkan PDF.

## Instalasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda.
2. Clone repositori ini atau unduh file-file proyek.
3. Jalankan perintah berikut untuk menginstal dependencies:

   ```
   npm install
   ```

## Penggunaan

1. Jalankan server dalam mode development:

   ```
   npm run dev
   ```

2. Server akan berjalan di port 3603. Akses endpoint berikut melalui browser atau tool seperti Postman:

   - `http://localhost:3603/docx-preview/true`: Menghasilkan PDF dengan merge jika ada multiple penerima.
   - `http://localhost:3603/docx-preview/false`: Menghasilkan PDF tanpa merge.

3. File PDF akan didownload otomatis saat mengakses endpoint.

## Struktur Proyek

- `index.js`: Entry point server Express.
- `package.json`: File konfigurasi proyek dan dependencies.
- `_mocks_/_data_.js`: Data mock untuk testing, termasuk nomor surat, data user, tanda tangan, QR code, dan tujuan.
- `utils/`: Folder berisi utility functions:
  - `generate-name-receiver.js`: Generate nama penerima berdasarkan data user dan tujuan.
  - `generate-patch-ttd.js`: Generate patch untuk tanda tangan dan QR code.
  - `generate-qr.js`: Utility untuk generate QR code.
  - `generate-random-namefiles.js`: Generate nama file acak untuk temporary files.
  - `patch-docx.js`: Fungsi utama untuk patch DOCX dan convert ke PDF.
- `surat_keterangan_kerja.docx`: Template DOCX untuk surat keterangan kerja.
- `surat_jalan.docx`: Template DOCX lainnya (jika diperlukan).
- `test.png`: Gambar contoh untuk tanda tangan.

## Dependencies

- `docx`: Untuk manipulasi file DOCX.
- `express`: Framework web untuk Node.js.
- `libreoffice-convert`: Untuk konversi DOCX ke PDF.
- `pdf-lib`: Untuk manipulasi PDF, termasuk merge.
- `qrcode`: Untuk generate QR code.

## Development Dependencies

- `nodemon`: Untuk auto-restart server saat development.

## Catatan

- Pastikan LibreOffice terinstal di sistem untuk konversi PDF.
- Data mock di `_mocks_/_data_.js` dapat diganti dengan data real dari database atau API.
- Proyek ini menggunakan port 3603 secara default; ubah di `index.js` jika diperlukan.

## Lisensi

ISC</content>
<parameter name="filePath">d:/1. work/projek/docx-patcher/README.md