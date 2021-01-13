import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
    const token = req.header("x-auth");
    if (!token) return res.status(401).json({message: "Access Denied. No Token was Provided."});

    try {
        const payload = jwt.verify(token, process.env.secretKey);
        req.user = payload;

        next();
    } catch(err) {
        res.status(400).json({message: "Invalid token."})
    }
}