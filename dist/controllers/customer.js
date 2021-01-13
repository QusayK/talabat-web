"use strict";
const connect_1 = require("../db/connect");
const getAll = (req, res) => {
    connect_1.connection.query('SELECT * FROM customers', (err, result) => {
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
    connect_1.connection.query('SELECT * FROM customers WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const post = (req, res) => {
    let customer = req.body;
    connect_1.connection.query('INSERT INTO customers (first_name, last_name, phone) VALUES (?, ? ,?)', [customer.first_name, customer.last_name, customer.phone], (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const put = (req, res) => {
    let id = +req.params['id'];
    let customer = req.body;
    connect_1.connection.query('UPDATE customers SET first_name=?, last_name=?, phone=? WHERE id=?', [customer.first_name, customer.last_name, customer.phone, id], (err, result) => {
        if (err) {
            res.json({ "Error": err });
        }
        else {
            res.json(result);
        }
    });
};
const _delete = (req, res) => {
    let id = +req.params['id'];
    connect_1.connection.query('DELETE FROM customers WHERE id=?', id, (err, result) => {
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
    post,
    put,
    _delete
};
//# sourceMappingURL=customer.js.map