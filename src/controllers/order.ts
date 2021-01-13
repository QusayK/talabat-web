import { connection } from '../db/connect';
import Order from '../models/Order';

const getAll = (req, res) => {
    connection.query('SELECT * FROM orders', (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const getSingle = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT * FROM orders WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
};

const post = (req, res) => {
    let order: Order = req.body;

    connection.query('INSERT INTO orders (rest_id, menu_id, customer_id, quantity, date_created) VALUES (?, ? ,?, ?, ?)', 
        [order.rest_id, order.menu_id, order.customer_id, order.quantity, new Date().toLocaleString()], 
        (err, result) => {
            if (err) {
                res.json({"Error": err});
            } else {
                res.json(result);
            }
    });
}

const put = (req, res) => {
    let id: number = +req.params['id'];
    let order: Order = req.body;

    connection.query('UPDATE orders SET rest_id=?, menu_id=?, customer_id=?, quantity=? WHERE id=?', 
        [order.rest_id, order.menu_id, order.customer_id, order.quantity, id], 
        (err, result) => {
            if (err) {
                res.json({"Error": err});
            } else {
                res.json(result);
            }
    });
}

const _delete = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('DELETE FROM orders WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const deleteCustomerOrders = (req, res) => {
    let customer_id: number = +req.params['customer_id'];

    connection.query('DELETE FROM orders WHERE customer_id=?', customer_id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}


export = {
    getAll,
    getSingle,
    post,
    put,
    _delete,
    deleteCustomerOrders
}