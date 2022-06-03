const bannerModel = require('../models/banner.model');
const fs = require('fs');

exports.getFormAdd = (req,res,next)=>{
    res.render('./banners/add');
}
exports.postAdd = async (req,res,next)=>{
    console.log(req.body);
    try {
        fs.rename(req.file.destination + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    const banner = new bannerModel({
        anh : filename,
    });
    await banner.save((err)=>{
        if (err){
            console.log("Loi add")
        } else {
            console.log("add succes")
        }
    })
    res.redirect('/banner/add')
}
exports.getListLoai = async (req,res,next)=>{
    const listBanner = await bannerModel.find();
    res.render('./banners/list',{listBanner:listBanner});
}
exports.getFormEdit = async (req,res,next)=>{
    let itemBanner = await bannerModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemBanner);
    if (itemBanner==null){
        res.send('Khong tim thay')
    }
    res.render('./banners/edit',{itemBanner:itemBanner})
}
exports.postEdit=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    try {
        fs.rename(req.file.destination + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('./banners/edit',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    let du_lieu = {
        anh : filename,
    }

    //goi lenh update
    bannerModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/banner/list')
}
//xoa
exports.postDelete=(req,res,next)=>{
    console.log(req.params);
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    bannerModel.deleteOne(dieu_kien,function (err){
        if (err)
        {
            console.log("Loi delete"+err.message)
        }else {
            console.log('Xoa thanh cong')
        }
    })
    res.redirect('/banner/list')
}