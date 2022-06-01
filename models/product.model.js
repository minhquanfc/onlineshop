const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const productSchema = mongoose.Schema({
    tensanpham:'String',
    giasanpham:'String',
    mota:'String',
    anhsanpham:'String',
    loai:'String'
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;