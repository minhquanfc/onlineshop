const giohangModel = require("../models/giohang.model");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
exports.postThemGioHang = async (req,res,next)=>{
    // const giohang = new giohangModel({
    //     tensanpham : req.body.tensanpham,
    //     giasanpham : req.body.giasanpham,
    //     soluong : req.body.soluong,
    //     tongtien : req.body.tongtien,
    //     anh : req.body.anh,
    // });
    // await giohang.save((err)=>{
    //     if (err){
    //         console.log("Loi add")
    //     } else {
    //         console.log("add succes")
    //         res.send(giohang)
    //     }
    // })

    // console.log(req.user._id)
    const userid = "6296c9e3b61862495c60aed5"
    const cart = new giohangModel({
        user: userid,
        products: {
            // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            tensanpham:req.body.tensanpham,
            giasanpham:req.body.giasanpham,
            soluong:req.body.soluong,
            tongtien:req.body.tongtien,
            anh:req.body.anh,
        },
})
    console.log(cart)
    await cart.save((err)=>{
        if (err){
            console.log("Loi add")
        } else {
            console.log("add succes")
            res.send(cart)
        }
    })
}
exports.getGioHang = async (req,res,next)=>{
    const gioHang = await giohangModel.find();
    res.send(gioHang);
}