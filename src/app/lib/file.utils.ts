import { Request } from "express";
import path from "path";

export default class FileUtils {
  private static _imageMimeTypes = [
    "image/jpeg", // JPEG / JPG
    "image/png", // PNG
    "image/gif", // GIF
    "image/bmp", // BMP
    "image/webp", // WebP
    "image/svg+xml", // SVG
    "image/x-icon", // ICO (Icon)
    "image/tiff", // TIFF
    "image/heif", // HEIF
    "image/heic", // HEIC
    "image/avif", // AVIF
    "image/jp2", // JPEG 2000
  ];

  private static _documentMimeTypes = [
    "application/pdf", // PDF
    "application/msword", // DOC (Microsoft Word 97-2003)
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX (Microsoft Word)
    "application/vnd.ms-excel", // XLS (Microsoft Excel 97-2003)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX (Microsoft Excel)
    "application/vnd.ms-powerpoint", // PPT (Microsoft PowerPoint 97-2003)
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX (Microsoft PowerPoint)
    "text/plain", // TXT (Plain Text)
    "application/rtf", // RTF (Rich Text Format)
    "application/vnd.oasis.opendocument.text", // ODT (OpenDocument Text)
    "application/vnd.oasis.opendocument.spreadsheet", // ODS (OpenDocument Spreadsheet)
    "application/vnd.oasis.opendocument.presentation", // ODP (OpenDocument Presentation)
    "application/epub+zip", // EPUB (Ebook format)
    "application/x-7z-compressed", // 7Z (Compressed archive)
    "application/zip", // ZIP
    "application/x-rar-compressed", // RAR
    "application/x-tar", // TAR
    "application/json", // JSON
    "application/xml", // XML
    "text/csv", // CSV
  ];

  static isDoc(file: Express.Multer.File) {
    return this._documentMimeTypes.includes(file.mimetype);
  }

  static isImage(file: Express.Multer.File) {
    return this._imageMimeTypes.includes(file.mimetype);
  }

  static multerDestination(file: Express.Multer.File) {
    let dest = "src/storage/documents";
    if (this._imageMimeTypes.includes(file.mimetype)) {
      dest = "src/storage/images";
    }
    return path.join(process.cwd(), dest);
  }

  static multerFileName(file: Express.Multer.File) {
    let prefix = "";
    if (this.isImage(file)) {
      prefix = "img_";
    } else if (this.isDoc(file)) {
      prefix = "doc_";
    }
    return `${prefix}${new Date().getTime()}_${file.originalname.toLowerCase()}`;
  }

  static multerPublicUrl(mimetype: string, filename: string) {
    let folder = "";
    if (this._imageMimeTypes.includes(mimetype)) {
      folder = "/images/";
    } else if (this._documentMimeTypes.includes(mimetype)) {
      folder = "/documents/";
    }
    return `${process.env.ADDR}/public${folder}${filename}`;
  }
}
