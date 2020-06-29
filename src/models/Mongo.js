const mongoose = require("mongoose");
const Product = require('./Product');


// Connect to MongoDB
mongoose
    .connect(
        "mongodb://localhost:27017/db1",
        {useNewUrlParser: true}
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const newProduct = new Product({
    name: "proudct " + Math.floor(Math.random(1, 100) * 100)
});

// Insert
newProduct.save().then(p =>  p.show());

// Find all
Product.find()
    .then(products => products.map(p => p.show()));

// Find one
Product.find().where({name}).eq
    .then(products => {
        console.log('find one', products);
    });