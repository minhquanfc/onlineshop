const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const categorySchema = mongoose.Schema({
    ten:'String',
    anh:'String',
});

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;