"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connect_1 = require("../db/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var role;
(function (role) {
    role[role["admin"] = 1] = "admin";
    role[role["customer"] = 2] = "customer";
})(role || (role = {}));
;
const generateToekn = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.secretKey);
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    let _role = user.role || role.customer;
    let password = yield bcrypt_1.default.hash(user.password, 10);
    connect_1.connection.query('SELECT * FROM users WHERE email=?', user.email, (err, result) => {
        if (result[0]) {
            res.json({ message: "Email is taken." });
        }
    });
    connect_1.connection.query('INSERT INTO users (email, first_name, last_name, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)', [user.email, user.first_name, user.last_name, password, user.phone, _role], (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            connect_1.connection.query('SELECT * FROM users WHERE email=?', user.email, (err, _result) => {
                if (err) {
                    res.json({ "Error": err });
                }
                else {
                    const token = generateToekn(_result[0]);
                    res.header("x-auth", token).json({ id: _result[0].id, role: _result[0].role, token });
                }
            });
        }
    });
});
const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    connect_1.connection.query('SELECT * FROM users WHERE email=?', email, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            let validPass = yield bcrypt_1.default.compare(password, result[0].password);
            if (!validPass)
                return res.status(400).send({ message: "Invalid email or password!" });
            const token = generateToekn(result[0]);
            res.header("x-auth", token).json({ id: result[0].id, role: result[0].role, token });
        }
    }));
};
module.exports = {
    register,
    login
};
//# sourceMappingURL=auth.js.map