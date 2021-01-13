import { connection } from '../db/connect';
import Rating from '../models/Rating';

const getAll = (req, res) => {
    connection.query('SELECT * FROM ratings', (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const getSingle = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT * FROM ratings WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
};

const post = (req, res) => {
    let rating: Rating = req.body;

    connection.query('INSERT INTO ratings (rest_id, customer_id, rating, date_rated) VALUES (?, ? ,?, ?)', 
        [rating.rest_id, rating.customer_id, rating.rating, new Date().toLocaleString()], 
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
    let rating: Rating = req.body;

    connection.query('UPDATE ratings SET rest_id=?, customer_id=?, rating=? WHERE id=?', 
        [rating.rest_id, rating.customer_id, rating.rating, id], 
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

    connection.query('DELETE FROM ratings WHERE id=?', id, (err, result) => {
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
    _delete
}