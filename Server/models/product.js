const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type:String,
        required: true
    }
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;