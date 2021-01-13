import { connection } from '../db/connect';
import Restaurant from '../models/Restaurant';
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

const dest = 'dist/public/images/';

const getAll = (req, res) => {
    connection.query('SELECT * FROM restaurants', (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const getSingle = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT * FROM restaurants WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const post = (req, res) => {
    let restaurant: Restaurant = req.body;
    let path: string;

    req.file ? path = req.file.filename : path = null;

    connection.query('INSERT INTO restaurants (name, city, lat, lng, phone, image) VALUES (?, ? ,?, ?, ?, ?)', 
        [restaurant.name, restaurant.city, restaurant.lat, restaurant.lng, restaurant.phone, path], 
        (err, result) => {
            if (err) {
                res.json({"Error": err});
            } else {
                res.json(result);
            }
    });
}

const put = async (req, res) => {
    let id: number = +req.params['id'];
    let restaurant: Restaurant = req.body;

    connection.query('SELECT * FROM restaurants WHERE id=?', id, async (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            if (!result[0]) 
                res.send("Restaurant Not Found.");
            else {
                if (req.file) {
                    if (result[0].image)
                        await unlinkAsync(dest + result[0].image);
                    restaurant.image = req.file.filename;
                } else if (!req.file) {
                    restaurant.image = result[0].image;
                }

                connection.query('UPDATE restaurants SET name=?, city=?, lat=?, lng=?, phone=?, image=? WHERE id=?', 
                    [restaurant.name, restaurant.city, restaurant.lat, restaurant.lng, restaurant.phone, restaurant.image, id], 
                    (err, result) => {
                        if (err) {
                            res.json({"Error": err});
                        } else {
                            res.json(result);
                        }
                });
            }
        }
    });
}

const _delete = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT image FROM restaurants WHERE id=?', id, async (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            if (!result[0]) {
                res.send("Restaurant Not Found.")
            } else {
                if (result[0].image)
                    await unlinkAsync(dest + result[0].image);  
                    
                connection.query('DELETE FROM restaurants WHERE id=?', id, (err, result) => {
                    if (err) {
                        res.json({"Error": err});
                    } else {
                        res.json(result);
                    }
                });
            }
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