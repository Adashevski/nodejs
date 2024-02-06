import multer from "multer";
import path from "path";

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    const avatarFileName = `${req.user._id.toString()}${path.extname(
      file.originalname
    )}`;
    cb(null, avatarFileName);
  },
});

export const upload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});
