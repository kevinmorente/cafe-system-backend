const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRoule = require('../services/checkRole');

router.post('/add', auth.authenticationToken, checkRoule.checkRole, (req, res) => {
    let category = req.body;
    query = "INSERT INTO category (name) VALUES (?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({message: "Category added successfully"});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticationToken, (req, res, next) => {
    var query = "SELECT * FROM category ORDER BY id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticationToken, checkRoule.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "UPDATE category SET name =? WHERE id =?";
    connection.query(query, [product.name, product.id], (err, results) => {
        if (!err) {
            if(results.affectedRows == 0){
                return res.status(404).json({ message: "Category not found" });
            }else {
                return res.status(200).json({ message: "Category updated successfully" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;