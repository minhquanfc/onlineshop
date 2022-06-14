const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);

const giohangSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            tensanpham:'String',
            giasanpham:'String',
            soluong:'String',
            tongtien:'String',
            anh:'String',
        }
    ],
});

const GioHang = mongoose.model("GioHang",giohangSchema);
module.exports = GioHang;