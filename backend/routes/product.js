const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var chackRule = require('../services/checkRole');

router.post('/add', auth.authenticationToken, chackRule.checkRole, (req, res) => {
    let product = req.body;
    query = "INSERT INTO product (name,categoryId,description,price,status) VALUES (?,?,?,?,'true')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.status], (err, results) => {
        if (!err) {
            return res.status(200).json({message: "Category added successfully"});
        }
        else {
            return res.status(500).json(err);
        }
    })
});

router.get('/get', auth.authenticationToken, (req, res, next) => {
    var query = "SELECT p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName FROM product as p INNER JOIN category as c WHERE p.categoryId = c.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
