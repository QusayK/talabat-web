import multer from 'multer';
import path from 'path';

export default () => {
    const destination = 'dist/public/images';

    const storage = multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
            const uniqueSuffix = new Date().toISOString().replace(/:/g, "-") + 
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });

    const fileFilter = (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;

        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) return cb(null, true);
        else return cb("Error: The type of the selected image is not supported!")
    };

    return multer({
        storage,
        limits: {fileSize: 1024 * 1024 * 5},
        fileFilter,
    });
}