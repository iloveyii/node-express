const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.methods.show = function() {
    console.log("Name : ", this.name);
}

module.exports = Product = mongoose.model('product', ProductSchema);