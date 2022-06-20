const giohangModel = require("../models/giohang.model");
const UserModel = require("../models/user.model");
const proModel = require("../models/product.model");

exports.postThemGioHang = async (req, res, next) => {
    const {
        productId,
        soluong
    } = req.body;
    const user = req.user
    // res.send(user)
    let cart = await giohangModel
        .findOne({ idUser: user._id })
    if (!cart){
        cart = new giohangModel({
            idUser: user._id,
            products: [
                {
                    productId: req.body.productId,
                    tensanpham:req.body.tensanpham,
                    giasanpham: req.body.giasanpham,
                    anhsanpham: req.body.anhsanpham,
                    // soluong: req.body.soluong,
                    soluong,
                    tongtien: req.body.tongtien
                }
            ]
        });
        await
            cart.save();
        return res.json({ success: true, cart })
    }
    const dataUpdate = {};
    const productInCartIndex = cart
        .products
        .findIndex(item => String(item.productId) === productId);
    if (productInCartIndex >= 0) {
        dataUpdate.$inc = {
            [`items.${productInCartIndex}.soluong`]: soluong
        }
    } else {
        dataUpdate.$push = {
            products: {
                productId: productId,
                tensanpham:req.body.tensanpham,
                giasanpham: req.body.giasanpham,
                anhsanpham: req.body.anhsanpham,
                soluong: req.body.soluong,
                tongtien: req.body.tongtien
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
    console.log(req.params.id)
    const cart = await giohangModel.findOne({
        idUser: user._id
    })
    if (!cart) {
        res.json({ success: true });
    }
    const productIndex = cart.products.findIndex(item => String(item.productId) === productId )
    if (productIndex < 0) {
        return res.json({ success: true });
    }
    const newItems = cart
        .products
        .splice(productIndex, 1);
    await giohangModel.updateOne({
        _id: cart._id
    }, {
        $set: {
            products: newItems
        }
    })
    return res.json({ success: true });
}

exports.getGioHang = async (req, res, next) => {
    const user = req.user
    let cart = await giohangModel
        .findOne({ idUser: user._id })
    res.send(cart);
    console.log(cart)
}