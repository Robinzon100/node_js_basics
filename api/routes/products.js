const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//this is the mongoose schemas
const Product = require('../models/product');


//THES ARE THE REQUESTS AND THE RESPONSES THAT HAS "/products"


//GET METHOD FOR PRODUCTS //i can add more querry operators like (Products.where) or (.limit)
router.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);//docs is a=the array that has all of the product opjects
            // if (docs.length >=0) {
            res.status(200).json(docs);
            // } else {
            //     res.status(404).json({
            //         message: "No entry"
            //     });                
            // }
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });


    // res.status(200).json({
    //     message:"handling GET requests to /products"
    // });
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
        res.status(201).json({
            message:"handling POST requests to /products",
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});



//GET METHOD FOR PRODUCT THAT HAS A SPECIFIC ID INDECATED BY product id
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json(doc);//doc is object
        }else{
            res.status(404).json({
                message: "No valid entry found for provided id"
            });
        }
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
});
    
    
    
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


//PATCH METHOD FOR PRODUCT THAT HAS A ID INDECATED BY product id
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    // by using a for loop ops is going to be 0 to the size of the req.body(that an arrray) 
    // and then we give ==updateOps[ops.propName]==(an objects values : value) the ==ops.value==
    // === === becouse the ==updateOps== is and object we must past an array wich has the ==propName== and the schema propertie
    // like so:
    // [
	// {"propName" : "price", "value": "22222222222"}	
    // ]
    // ==req.body== is the entiere product object that is in mongoose schema
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
        console.table(req.body);
    })
    .catch();

    // === in this case is will require every schema value like nama and price
    // Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice}});

    // res.status(200).json({
    //     message:"updated product"
    // });
});

//DELETE METHOD FOR PRODUCT THAT HAS A ID INDECATED BY product id
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
    
    // res.status(200).json({
    //     message:"deleted product"
    // });
});

module.exports = router;