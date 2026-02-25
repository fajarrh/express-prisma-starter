export const MIME_GROUPS = {
  IMAGE: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
    "image/tiff",
    "image/heif",
    "image/heic",
    "image/avif",
  ],
  DOC: [
    "application/pdf",
    "application/msword",
    "text/plain",
    "application/rtf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.oasis.opendocument.text",
  ],
  SHEET: [
    "application/vnd.ms-excel",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.oasis.opendocument.spreadsheet",
  ],
  SLIDE: [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.oasis.opendocument.presentation",
  ],
  ARCHIVE: [
    "application/x-7z-compressed",
    "application/zip",
    "application/x-rar-compressed",
    "application/x-tar",
  ],
  DATA: ["application/json", "application/xml", "application/epub+zip"],
} as const;

export const FOLDER_CATEGORIES = [
  "images",
  "documents",
  "spreadsheets",
  "presentations",
  "archives",
  "data",
  "others",
] as const;
