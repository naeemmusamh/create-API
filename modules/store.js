const mongoose = require('mongoose');

const store = mongoose.Schema({
    item: {type: String, required: true,},
    image: {type: String, required: true,},
    category: {type: String, required: true,},
    price: {type: Number, required: true},
    inStock: {type: Number, required: true,},
    count: {type: Number, required: true,},
});

module.exports = mongoose.model('store', store);