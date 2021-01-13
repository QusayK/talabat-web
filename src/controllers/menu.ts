import { connection } from '../db/connect';
import Menu from '../models/Menu';
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

const dest = 'dist/public/images/';

const getAll = (req, res) => {
    connection.query('SELECT * FROM menus', (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
}

const getSingle = (req, res) => {
    let id: number = +req.params['id'];

    connection.query('SELECT * FROM menus WHERE id=?', id, (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            res.json(result);
        }
    });
};

const post = (req, res) => {
    let menu: Menu = req.body;
    let path: string;

    req.file ? path = req.file.filename : path = null;

    connection.query('INSERT INTO menus (rest_id, name, description, price, image) VALUES (?, ? ,?, ?, ?)', 
        [menu.rest_id, menu.name, menu.description, +menu.price, path], 
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
    let menu: Menu = req.body;

    connection.query('SELECT * FROM menus WHERE id=?', id, async (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            if (!result[0]) 
                res.send("Menu Not Found.");
            else {
                if (req.file) {
                    if (result[0].image)
                        await unlinkAsync(dest + result[0].image);
                    menu.image = req.file.filename;
                } else if (!req.file) {
                    menu.image = result[0].image;
                }

                connection.query('UPDATE menus SET rest_id=?, name=?, description=?, price=?, image=? WHERE id=?', 
                    [menu.rest_id, menu.name, menu.description, +menu.price, menu.image, id], 
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

    connection.query('SELECT image FROM menus WHERE id=?', id, async (err, result) => {
        if (err) {
            res.json({"Error": err});
        } else {
            if (!result[0]) {
                res.send("Menu Not Found.")
            } else {
                if (result[0].image)
                    await unlinkAsync(dest + result[0].image);  
                    
                connection.query('DELETE FROM menus WHERE id=?', id, (err, result) => {
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