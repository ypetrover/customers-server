const express = require('express');
const router = express.Router();
const handlers = require('../handlers/handlers')

router.get('/getAll' , (req , res )=>{
    console.log("the client asked for:  " + req.url)
    handlers.getAll(req , res);
})

router.get('/getSpecific/:id', (req , res)=>{
    console.log("the client asked for:  " + req.url)
    handlers.getSpecific(req, res)
})

router.get('/customerOrders/:id', (req , res)=>{
    console.log("the client asked for:  " + req.url)
    handlers.getOrders(req, res)
})

router.get('/getDetails/:id', (req , res)=>{
    console.log("client asked for:  " + req.url)
    handlers.getDetails(req, res)
})

module.exports = router;