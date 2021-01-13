import { connection } from '../db/connect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as dotenv from 'dotenv';
dotenv.config();

enum role {admin = 1, customer = 2};

const generateToekn = (user: User) => {
    return jwt.sign({id: user.id, role: user.role}, process.env.secretKey);
} 

const register = async (req, res) => {
    let user: User = req.body;
    let _role = user.role || role.customer;
    let password = await bcrypt.hash(user.password, 10);

    connection.query('SELECT * FROM users WHERE email=?', user.email, (err, result) => {
        if (result[0]) {
            res.json({message: "Email is taken."});
        }
    });

    connection.query('INSERT INTO users (email, first_name, last_name, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)', 
        [user.email, user.first_name, user.last_name, password, user.phone, _role], 
        (err, result) => {
            if (err) {
                res.json({"Error": err});
            } else {
                connection.query('SELECT * FROM users WHERE email=?', user.email, (err, _result) => {
                    if (err) {
                        res.json({"Error": err});
                    } else {
                        const token = generateToekn(_result[0]);
                        res.header("x-auth", token).json({id: _result[0].id, role: _result[0].role, token});
                    }
                });
            }
    });
}

const login = (req, res) => {
    let email: string = req.body.email;
    let password: string = req.body.password;

    connection.query('SELECT * FROM users WHERE email=?', email, async (err, result) => {
        if (err) {

            res.json({"Error": err});
        } else {

            let validPass = await bcrypt.compare(password, result[0].password);

            if (!validPass) return res.status(400).send({message: "Invalid email or password!"});

            const token = generateToekn(result[0]);

            res.header("x-auth", token).json({id: result[0].id, role: result[0].role, token});
        }
    });
}

export = {
    register,
    login
}