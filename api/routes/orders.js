//requests the express library and put it in a variable
const express = require('express');

//after using the express variable the we use one of the library items
const router = express.Router();


//THES ARE THE REQUESTS AND THE RESPONSES THAT HAS "/orders"
router.get("/", (req, res, next) =>{
    res.status(200).json({
        message:"orders was fetched"
    });
});

router.post("/", (req, res, next) =>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"orders was created",
        order: order
    });
});

router.get("/:orderId", (req, res, next) =>{
    res.status(200).json({
        message:"orders detales",
        orderId: req.params.orderId,
    });
});

router.delete("/:orderId", (req, res, next) =>{
    res.status(200).json({
        message:"orders was deleted",
        orderId: req.params.orderId
    });
});




module.exports = router;