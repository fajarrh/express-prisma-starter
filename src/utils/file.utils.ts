import path from "path";
import fs from "fs";
import { MIME_GROUPS } from "@constant/file.constant";

const getFileCategory = (mimetype: string) => {
  if ((MIME_GROUPS.IMAGE as readonly string[]).includes(mimetype)) return { folder: "images", prefix: "img" };
  if ((MIME_GROUPS.DOC as readonly string[]).includes(mimetype)) return { folder: "documents", prefix: "doc" };
  if ((MIME_GROUPS.SHEET as readonly string[]).includes(mimetype)) return { folder: "spreadsheets", prefix: "xls" };
  if ((MIME_GROUPS.SLIDE as readonly string[]).includes(mimetype)) return { folder: "presentations", prefix: "ppt" };
  if ((MIME_GROUPS.ARCHIVE as readonly string[]).includes(mimetype)) return { folder: "archives", prefix: "arc" };
  if ((MIME_GROUPS.DATA as readonly string[]).includes(mimetype)) return { folder: "data", prefix: "data" };
  return { folder: "others", prefix: "file" };
};

export const multerDestination = (file: Express.Multer.File) => {
  const { folder } = getFileCategory(file.mimetype);
  const targetPath = path.join(process.cwd(), "src/storage", folder);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  return targetPath;
};

export const multerFileName = (file: Express.Multer.File) => {
  const { prefix } = getFileCategory(file.mimetype);
  const timestamp = Date.now();
  
  const cleanName = file.originalname
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._-]/g, ""); 
  
  return `${prefix}_${timestamp}_${cleanName}`;
};