const giohangModel = require("../models/giohang.model");
const UserModel = require("../models/user.model");
const proModel = require("../models/product.model");

exports.postThemGioHang = async (req, res, next) => {
    const {
        productId,
        qty = 1
    } = req.body;
    const user = req.user
    // res.send(user)
    let cart = await giohangModel
        .findOne({ idUser: user._id })
    if (!cart){
        cart = new giohangModel({
            idUser: user._id,
            items: [
                {
                    productId: req.body.productId,
                    qty
                }
            ]
        });
        await
            cart.save();
        return res.json({ success: true, cart })
    }
    const dataUpdate = {};
    const productInCartIndex = cart
        .items
        .findIndex(item => String(item.productId) === productId);
    if (productInCartIndex >= 0) {
        dataUpdate.$inc = {
            [`items.${productInCartIndex}.qty`]: qty
        }
    } else {
        dataUpdate.$push = {
            items: {
                productId: productId,
                qty
            }
        };
    }
    await giohangModel.updateOne({
        _id: cart._id
    }, dataUpdate);
    return res.json({ success: true, dataUpdate });

}

exports.postDel = async (req, res, next) => {
    const user = req.user
    const { productId } = req.body
    const cart = await giohangModel.findOne({
        idUser: user._id
    })
    if (!cart) {
        res.json({ success: true });
    }
    const productIndex = cart.items.findIndex(item => String(item.productId) === productId )
    if (productIndex < 0) {
        return res.json({ success: true });
    }
    const newItems = cart
        .items
        .splice(productIndex, 1);
    await giohangModel.updateOne({
        _id: cart._id
    }, {
        $set: {
            items: newItems
        }
    })
    return res.json({ success: true });
}

exports.getGioHang = async (req, res, next) => {
    const gioHang = await giohangModel.find();
    res.send(gioHang);
}