const productModel = require('../models/product.model');
const bannerModel = require('../models/banner.model');
const categoryModel = require('../models/category.model');


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