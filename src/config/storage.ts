import FileUtils from "@lib/file.utils";
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
