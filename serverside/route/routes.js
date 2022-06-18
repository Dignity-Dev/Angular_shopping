var express = require('express');
var router = express.Router();


const Item = require('./model/shoppingItem.js');


router.get('/items', (req, res, next)=> {
        Item.find(function(err, items){
            if (err){
                res.json(err);
            }
            else{
                res.json(items);
            }
        });
    });



module.exports = router;