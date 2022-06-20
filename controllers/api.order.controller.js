const orderModel = require('../models/order.model');
const giohangModel = require("../models/giohang.model");

exports.postOrder= async (req, res, next)=> {
    const user = req.user
    const order = new orderModel({
        idUser: user._id,
        hoTen:req.body.hoTen,
        soDienthoai:req.body.soDienthoai,
        diaChi:req.body.diaChi,
        ngayMua:req.body.ngayMua,
        soLuong:req.body.soLuong,
        tongTien:req.body.tongTien,
        trangThai:req.body.trangThai,
        products: [
            {
                tensanpham:req.body.tensanpham,
                giasanpham: req.body.giasanpham,
                anhsanpham: req.body.anhsanpham,
                soluong: req.body.soluong,
            }
        ]
    });
    await order.save();
    return res.json({ success: true, order })
}

exports.getOrder = async (req, res, next) => {
    const user = req.user
    let cart = await orderModel
        .find({ idUser: user._id })
    res.send(cart);
    console.log(cart)
}
exports.postDel = (req, res, next) => {
    const user = req.user
    // console.log(user._id)
    let dieu_kien ={
        idUser: user._id
    }
    giohangModel.deleteOne(dieu_kien,function (err){
        if (err)
        {
            console.log("Loi delete"+err.message)
        }else {
            console.log('Xoa thanh cong')
            return res.json({ success: true });
        }
    })
}
