const productModel = require('../models/product.model');
const fs = require('fs');

//get form add
exports.getFormAddProduct = (req,res,next)=>{
    res.render('./products/add');
}
//post add
exports.postAddProduct = async (req,res,next)=>{
    console.log(req.body);
    // console.log(req.file)
    if (req.body.tensanpham.length==0 && req.body.mota.length==0 && req.body.giasanpham  == 0){
        return res.render('./products/add',{msg:'Vui lòng không để trống'})
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
        return res.render('add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    const product = new productModel({
        tensanpham : req.body.tensanpham,
        giasanpham : req.body.giasanpham,
        mota : req.body.mota,
        loai : req.body.loai,
        anhsanpham : filename,
    });
    await product.save((err)=>{
        if (err){
            console.log("Loi add")
        } else {
            console.log("add succes")
        }
    })
    res.redirect('/products/add')
}
//list
exports.getListProduct = async (req,res,next)=>{
    const listProduct = await productModel.find();
    res.render('./products/list',{listProduct:listProduct});
}

//get form list
exports.getFormEditProduct = async (req,res,next)=>{
    let itemProd = await productModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemProd);
    if (itemProd==null){
        res.send('Khong tim thay')
    }
    res.render('./products/edit',{itemProd:itemProd})
}
//post edit
exports.postEdit=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    if (req.body.tensanpham.length==0 && req.body.mota.length==0 && req.body.giasanpham  == 0){
        return res.render('./products/edit:id',{msg:'Vui lòng không để trống'})
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
        return res.render('./products/edit',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    let du_lieu = {
        tensanpham : req.body.tensanpham,
        giasanpham : req.body.giasanpham,
        mota : req.body.mota,
        loai : req.body.loai,
        anhsanpham : filename,
    }

    //goi lenh update
    productModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/products')
}
//xoa
exports.postDelete=(req,res,next)=>{
    console.log(req.params);
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    productModel.deleteOne(dieu_kien,function (err){
        if (err)
        {
            console.log("Loi delete"+err.message)
        }else {
            console.log('Xoa thanh cong')
        }
    })
    res.redirect('/products')
}