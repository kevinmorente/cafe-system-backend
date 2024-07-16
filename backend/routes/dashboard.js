const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details', auth.authenticationToken, (req, res, next) => {
    var categoryCount;
    var productCount;
    var billCount;
    var query = "SELECT count(id) AS categoryCount FROM category"
    connection.query(query, (err, result) => {
        if (!err) {
            categoryCount = result[0].categoryCount;
        }else {
            return res.status(500).json(err);
        }
    })

    var query = "SELECT count(id) AS productCount FROM product"
    connection.query(query, (err, result) => {
        if (!err) {
            productCount = result[0].productCount;
        } else {
            return res.status(500).json(err);
        }
    })

    var query = "SELECT count(id) AS billCount FROM bill"
    connection.query(query, (err, result) => {
        if (!err) {
            billCount = result[0].billCount;
            var data = {
                categoryCount: categoryCount,
                productCount: productCount,
                billCount: billCount
            }
            return res.status(200).json(data);
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;