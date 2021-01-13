"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.default = () => {
    const destination = 'dist/public/images';
    const storage = multer_1.default.diskStorage({
        destination,
        filename: (req, file, cb) => {
            const uniqueSuffix = new Date().toISOString().replace(/:/g, "-") +
                Math.round(Math.random() * 1e9) +
                path_1.default.extname(file.originalname);
            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });
    const fileFilter = (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype)
            return cb(null, true);
        else
            return cb("Error: The type of the selected image is not supported!");
    };
    return multer_1.default({
        storage,
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter,
    });
};
//# sourceMappingURL=upload.js.map