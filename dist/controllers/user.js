"use strict";
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
var role;
(function (role) {
    role[role["admin"] = 1] = "admin";
    role[role["customer"] = 2] = "customer";
})(role || (role = {}));
;
const getAll = (req, res) => {
    connect_1.connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const getSingle = (req, res) => {
    let id = +req.params['id'];
    connect_1.connection.query('SELECT * FROM users WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +req.params['id'];
    let user = req.body;
    let password = yield bcrypt_1.default.hash(user.password, 10);
    connect_1.connection.query('UPDATE users SET email=?, first_name=?, last_name=?, password=?, phone=?, role=? WHERE id=?', [user.email, user.first_name, user.last_name, password, user.phone, user.role, id], (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
});
const _delete = (req, res) => {
    let id = +req.params['id'];
    connect_1.connection.query('DELETE FROM users WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
module.exports = {
    getAll,
    getSingle,
    put,
    _delete
};
//# sourceMappingURL=user.js.map