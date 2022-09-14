const orderModel = require("../models/order.model");
const fs = require("fs");

exports.getFormlistOrder = async (req, res, next)=>{
    const listOrder = await orderModel.find();
    res.render('./orders/list',{listOrder:listOrder});
}

//get form list
exports.getFormEditOrder = async (req,res,next)=>{
    let itemOrder = await orderModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemOrder);
    if (itemOrder==null){
        res.send('Khong tim thay')
    }
    res.render('./orders/edit',{itemOrder:itemOrder})
}
exports.postEdit=(req,res,next)=>{
    console.log(req.params);
    let dieu_kien ={
        _id : req.params.id
    }
    let du_lieu = {
        trangThai:req.body.trangthai,
    }
    console.log(du_lieu);
    orderModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/orders')
}
exports.postDelete=(req,res,next)=>{
    console.log(req.params);
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    orderModel.deleteMany(dieu_kien,function (err){
        if (err)
        {
            console.log("Loi delete"+err.message)
        }else {
            console.log('Xoa thanh cong')
        }
    })
    res.redirect('/orders')
}