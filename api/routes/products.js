const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

//THES ARE THE REQUESTS AND THE RESPONSES THAT HAS "/products"


//GET METHOD FOR PRODUCTS
router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"handling GET requests to /rpoducts"
    });
}); 

//POST METHOD FOR PRODUCTS
router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    
    res.status(201).json({
        message:"handling POST requests to /rpoducts",
        createdProduct: product
    });
});

//GET METHOD FOR PRODUCT THAT HAS A SPECIFIC ID INDECATED BY product id
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById
    
    
    
    // if (id === 'special') {
    //     res.status(200).json({
    //         message:"you found the special item",
    //         id: id 
    //     });
    // }else{
    //     res.status(200).json({
    //         message:"you passed an ID",
    //         id:id
    //     });
    // }
});


//PATCH METHOD FOR PRODUCT THAT HAS A ID INDECATED BY product id
router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message:"updated product"
    });
});

//DELETE METHOD FOR PRODUCT THAT HAS A ID INDECATED BY product id
router.delete("/:productId", (req, res, next) => {
    res.status(200).json({
        message:"deleted product"
    });
});

module.exports = router;