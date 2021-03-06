//importing express and using it
const express = require('express');
const app = express();

//require a package that logs out incoming requests
const morgan = require('morgan');
//require a package that parses body
const bodyParser = require('body-parser');
//mongoose import
const mongoose = require('mongoose');

//REQUIRE ROUTS
const productRouts = require("./api/routes/products");
const orderRouts = require("./api/routes/orders");



//connetct mongoose call
mongoose.connect('mongodb://robinzon:' +
                process.env.MONGO_ATLAS_PW +
                '@node-rest-shop-shard-00-00-btaux.mongodb.net:27017,node-rest-shop-shard-00-01-btaux.mongodb.net:27017,node-rest-shop-shard-00-02-btaux.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
                    {
                        useNewUrlParser: true 
                    }
                );

// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "it works"
//     });
// });


//using morgan as a function dev is a format
app.use(morgan('dev'));

//using body-Parser as a function dev is a format
app.use(bodyParser.urlencoded({extended: false}));//parse the url(if true it suport ritch data bodys)
app.use(bodyParser.json());//json parsing


//ROUTS
//any URL that start with "/products" will be hadled 
//by this handler "productsRouts"
app.use("/products", productRouts);
app.use("/orders", orderRouts); 



app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-type, Accept, Authorization");
    if (req.method === 'OPTION') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});



//======================
//ERROR HANDLER
//======================
//ERROR HANDLER if after the slash theres 
//something i didnt write (like a url that doesnt exist) this error will fire up
app.use((req, res, next) =>{
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;