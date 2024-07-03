const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var chackRule = require('../services/checkRole');
const checkRole = require('../services/checkRole');

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

router.get('/getByCategory/:id', auth.authenticationToken, (req, res, next) => {
    const id = req.params.id
    var query = "SELECT id, name FROM product WHERE categoryId =? AND status = 'true'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getBtId/:id', auth.authenticationToken,(req, res, next) => {
    const id = req.params.id
    var query = "SELECT id, name, description, price FROM product WHERE id =?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticationToken, checkRole.checkRole,(req, res, next) =>{
    let product = req.body;
    var query = "UPDATE product SET name =?, description =?, price =?, status =? WHERE id =?";
    connection.query(query, [product.name, product.description, product.price, product.status, product.id], (err, results) => {
        if (!err) {
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Product not found"});
            }else{
                return res.status(200).json({message: "Product updated successfully"});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authenticationToken, checkRole.checkRole,(req, res, next) => {
    const id = req.params.id
    var query = "DELETE FROM product WHERE id =?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Product not found"});
            }else{
                return res.status(200).json({message: "Product deleted successfully"});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus', auth.authenticationToken,checkRole.checkRole,(req, res, next) => {
    let user = req.body;
    var query = "UPDATE product SET status =? WHERE id =?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Product not found"});
            }else{
                return res.status(200).json({message: "Product status updated successfully"});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
