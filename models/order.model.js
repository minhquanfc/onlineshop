const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const orderSchema = mongoose.Schema({
    idUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hoTen:'String',
    soDienthoai:'String',
    diaChi:'String',
    ngayMua:'String',
    soLuong:{
        type: Number
    },
    tongTien:{
        type: Number
    },
    trangThai:'String',
    products: [
        {
            tensanpham: 'String',
            giasanpham: {
                type: Number
            },
            soluong: {
                type: Number
            },
        }
    ]
});
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;