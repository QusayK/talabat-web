"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (+req.user.role !== 1)
        return res.status(403).json({ message: "Access Forbidden." });
    next();
};
//# sourceMappingURL=adminAuth.js.map