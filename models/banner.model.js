const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const bannerSchema = mongoose.Schema({
    anh:'String',
});

const Banner = mongoose.model("Banner",bannerSchema);
module.exports = Banner;