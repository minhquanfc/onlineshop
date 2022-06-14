const productModel = require('../models/product.model');
const bannerModel = require('../models/banner.model');
const categoryModel = require('../models/category.model');
const giohangModel = require('../models/giohang.model');



exports.getProduct =  async (req,res,next)=>{
    const listProduct = await productModel.find();
    res.send(listProduct);
}
exports.getBanner =  async (req,res,next)=>{
    const listBanner = await bannerModel.find();
    res.send(listBanner);
}
exports.getCategory =  async (req,res,next)=>{
    const listCategory = await categoryModel.find();
    res.send(listCategory);
}
exports.TypeDienthoai = async (req,res,next)=>{
    let datas = await productModel.find({
        loai: {$regex: "Điện thoại"}
    })
    res.send(datas)
}
exports.TypeMaytinh = async (req,res,next)=>{
    let datas = await productModel.find({
        loai: {$regex: "Máy tính"}
    })
    res.send(datas)
}
exports.TypeIpad = async (req,res,next)=>{
    let datas = await productModel.find({
        loai: {$regex: "Ipad"}
    })
    res.send(datas)
}
exports.TypeDongho = async (req,res,next)=>{
    let datas = await productModel.find({
        loai: {$regex: "Đồng hồ"}
    })
    res.send(datas)
}
exports.TypePhukien = async (req,res,next)=>{
    let datas = await productModel.find({
        loai: {$regex: "Phụ kiện"}
    })
    res.send(datas)
}
exports.Search = async (req,res,next)=>{
    var filter = req.query.filter;
    console.log(filter)
    const data = await productModel.find({
        loai:{$regex: filter}
    });
    return res.status(200).json(data);
}