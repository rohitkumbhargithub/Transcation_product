const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title:{
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    sold: {
        type: String,
    },
    dateOfSale: {
        type: String,
    }
});

const products = mongoose.model('Product', productSchema);

module.exports = products;

