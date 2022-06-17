const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const giohangSchema = mongoose.Schema({
    idUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            tensanpham: 'String',
            giasanpham: {
                type: Number
            },
            soluong: {
                type: Number
            },
            tongtien:{
                type:Number
            }
        }
    ]
});
const GioHang = mongoose.model("GioHang",giohangSchema);
module.exports = GioHang;