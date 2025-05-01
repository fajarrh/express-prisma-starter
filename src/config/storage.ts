import FileUtils from "@lib/FileUtils";
import multer from "multer";

const file = multer({
  storage: multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, FileUtils.multerDestination(file));
    },
    filename: (_, file, cb) => {
      cb(null, FileUtils.multerFileName(file));
    },
  }),
});

export { file };
