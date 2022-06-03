const categoryModel = require('../models/category.model');
const fs = require('fs');

exports.getFormAdd = (req,res,next)=>{
    res.render('./categorys/add');
}
exports.postAdd = async (req,res,next)=>{
    console.log(req.body);
    if (req.body.ten ==""){
        return res.render('./categorys/add',{msg:'Vui lòng nhập tên'})
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
        return res.render('./categorys/add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    const category = new categoryModel({
        ten : req.body.ten,
        anh : filename,
    });
    await category.save((err)=>{
        if (err){
            console.log("Loi add")
        } else {
            console.log("add succes")
        }
    })
    res.redirect('/category/add')
}
exports.getListLoai = async (req,res,next)=>{
    const listLoai = await categoryModel.find();
    res.render('./categorys/list',{listLoai:listLoai});
}
exports.getFormEdit = async (req,res,next)=>{
    let itemLoai = await categoryModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemLoai);
    if (itemLoai==null){
        res.send('Khong tim thay')
    }
    res.render('./categorys/edit',{itemLoai:itemLoai})
}
exports.postEdit=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    if (req.body.ten.length==0 && req.body.loai.length==0){
        return res.render('./categorys/edit:id',{msg:'Vui lòng không để trống'})
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
        return res.render('./categorys/edit',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    let du_lieu = {
        ten : req.body.ten,
        anh : filename,
    }

    //goi lenh update
    categoryModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/category/list')
}
//xoa
exports.postDelete=(req,res,next)=>{
    console.log(req.params);
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    categoryModel.deleteOne(dieu_kien,function (err){
        if (err)
        {
            console.log("Loi delete"+err.message)
        }else {
            console.log('Xoa thanh cong')
        }
    })
    res.redirect('/category/list')
}