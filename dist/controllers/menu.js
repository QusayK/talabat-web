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
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const unlinkAsync = util_1.promisify(fs_1.default.unlink);
const dest = 'dist/public/images/';
const getAll = (req, res) => {
    connect_1.connection.query('SELECT * FROM menus', (err, result) => {
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
    connect_1.connection.query('SELECT * FROM menus WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const post = (req, res) => {
    let menu = req.body;
    let path;
    req.file ? path = req.file.filename : path = null;
    connect_1.connection.query('INSERT INTO menus (rest_id, name, description, price, image) VALUES (?, ? ,?, ?, ?)', [menu.rest_id, menu.name, menu.description, +menu.price, path], (err, result) => {
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
    let menu = req.body;
    connect_1.connection.query('SELECT * FROM menus WHERE id=?', id, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            if (!result[0])
                res.send("Menu Not Found.");
            else {
                if (req.file) {
                    if (result[0].image)
                        yield unlinkAsync(dest + result[0].image);
                    menu.image = req.file.filename;
                }
                else if (!req.file) {
                    menu.image = result[0].image;
                }
                connect_1.connection.query('UPDATE menus SET rest_id=?, name=?, description=?, price=?, image=? WHERE id=?', [menu.rest_id, menu.name, menu.description, +menu.price, menu.image, id], (err, result) => {
                    if (err) {
                        res.json({ "Error": err });
                    }
                    else {
                        res.json(result);
                    }
                });
            }
        }
    }));
});
const _delete = (req, res) => {
    let id = +req.params['id'];
    connect_1.connection.query('SELECT image FROM menus WHERE id=?', id, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            if (!result[0]) {
                res.send("Menu Not Found.");
            }
            else {
                if (result[0].image)
                    yield unlinkAsync(dest + result[0].image);
                connect_1.connection.query('DELETE FROM menus WHERE id=?', id, (err, result) => {
                    if (err) {
                        res.json({ "Error": err });
                    }
                    else {
                        res.json(result);
                    }
                });
            }
        }
    }));
};
module.exports = {
    getAll,
    getSingle,
    post,
    put,
    _delete
};
//# sourceMappingURL=menu.js.map