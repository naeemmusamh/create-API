const express = require('express');
const store = require('../modules/store.js');
const router = express.Router();
const Store = require('../modules/store.js');

router.get('/', async (req,res) =>{
    try{
        const myStore = await Store.find();
        res.json(myStore);
    }catch(error){
        res.status(500).json({message: error.message});
    };
});

router.get('/:id', getItem, (req,res) =>{
    res.send(res.myStore.item);
});

router.post('/', async (req,res) =>{
    const myStore = new Store({
        item: req.body.item,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        inStock: req.body.inStock,
        count: req.body.count,
    });
    try{
        let products = await myStore.save();
        res.status(201).json({products});
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.patch('/:id', getItem, async (req,res) =>{
    if(req.body.name !== null){
        res.myStore.item = req.body.item;
    }
    if(req.body.image !== null){
        res.myStore.image = req.body.image;
    }
    if(req.body.category !== null){
        res.myStore.category = req.body.category;
    }
    if(req.body.price !== null){
        res.myStore.price = req.body.price;
    }
    if(req.body.inStock !== null){
        res.myStore.inStock = req.body.inStock;
    }
    if(req.body.count !== null){
        res.myStore.count = req.body.count;
    }

    try{
        const updateMyStore = await res.myStore.save();
        res.json({updateMyStore});
    }catch(error){
        res.status(400).json({message: message.error});
    }
});

router.delete('/:id', getItem, async (req,res) =>{
    try{
        await res.myStore.remove();
        res.json({message: 'delete correctly'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

async function getItem(req, res, next){
    let myStore;
    try{
        myStore = await Store.findById(req.params.id);
        if(myStore == null){
            return res.status(404).json({message: 'there is no info'});
        }
    }catch(error){
        return res.status(500).json({message: message.error});
    }

    res.myStore = myStore;
    next();
}

module.exports = router;