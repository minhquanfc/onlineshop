const productModel = require('../models/product.model');

exports.getProduct =  async (req,res,next)=>{
    const listProduct = await productModel.find();
    res.send(listProduct);
}