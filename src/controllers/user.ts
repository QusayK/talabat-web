import { connection } from '../db/connect';
import bcrypt from 'bcrypt';
import User from '../models/User';

enum role {admin = 1, customer = 2};

const getAll = (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const getSingle = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT * FROM users WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const put = async (req, res) => {
    let id: number = +req.params['id'];
    let user: User = req.body;
    let password = await bcrypt.hash(user.password, 10);

    connection.query('UPDATE users SET email=?, first_name=?, last_name=?, password=?, phone=?, role=? WHERE id=?', 
        [user.email, user.first_name, user.last_name, password, user.phone, user.role, id], 
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

    connection.query('DELETE FROM users WHERE id=?', id, (err, result) => {
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
    put,
    _delete
}