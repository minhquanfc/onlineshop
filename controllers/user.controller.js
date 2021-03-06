const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const fs = require("fs");
const productModel = require("../models/product.model");
const User = require("../models/user.model");
const giohangModel = require("../models/giohang.model");

exports.getFormLogin = (req,res,next)=>{
    res.render('./users/login');
}
exports.getFormRegister = (req,res,next)=>{
    res.render('./users/register');
}

exports.postLogin = async (req,res,next)=>{
    console.log(req.body);
    const  body = req.body;
    const user = await UserModel.findOne({
        email:body.email
    });
    // console.log(user.account!="admin")
    if (user.account != "admin"){
            return res.render('./users/login',{msg:'Tài khoản và mật khẩu không đúng'});
    }
    if (user)
    {
        console.log(user)
        //lay dc user roi thi kiem tra pass
        const validatePass = await  bcrypt.compare(body.password,user.password);
        if (validatePass){
            //login ok
            req.session.user = user
            res.redirect('/products')
        }else {
            // res.status(400).json({error:'Sai mat khau'});
            res.render('./users/login',{msg:'Sai mật khẩu'});
        }
    } else {
        // res.status(401).json({error:'Khong ton tai user'});
        res.render('./users/login',{msg:'Không tồn tại user'})
    }
}

exports.postRegister = async (req,res,next)=>{
    console.log(req.body);
    console.log(req.body.password);
    // if(req.body.password != req.body.password2)
    // {
    //     return res.render('./users/register',{msg:'Mật khẩu không khớp nhau'});
    // }
    //cac xu ly validate viet tiep o day
    //tao ma pass
    //tao chuoi ma hoa de noi voi pass ,chuoi nay se thay doi ngau nhien
    const  salt = await bcrypt.genSalt(10);
    console.log(salt);

    let objUser = {
        ten:req.body.ten,
        email : req.body.email,
        password:await bcrypt.hash(req.body.password,salt),
        sodienthoai : req.body.sodienthoai,
        diachi : req.body.diachi,
    }
    //ghi vao csdl
    await  UserModel.create(objUser,function (err){
        if (err)
        {
            console.log(err)
        }else {
            console.log("Save DB thanh cong")
        }
    })
    res.redirect('/products');
}

//get list users
exports.getListUsers = async (req,res,next)=>{
    const listUsers = await UserModel.find();
    res.render('./users/list',{listUsers:listUsers});
}
exports.getFromAddUsers = async (req,res,next)=>{
    res.render('./users/add');
}
exports.getFormEditUsers = async (req,res,next)=>{
    const itemUser = await UserModel.findById(req.params.id);
    console.log(itemUser)
    res.render('./users/edit',{itemUser:itemUser});
}
//add users
exports.postAdd = async (req,res,next)=>{
    console.log(req.body);
    const  salt = await bcrypt.genSalt(10);
    console.log(salt);
    if (req.body.ten.length==0 && req.body.email.length==0 && req.body.password  == 0 && req.body.sodienthoai  == 0 && req.body.diachi  == 0){
        return res.render('./users/add',{msg:'Vui lòng không để trống'})
    }
    if (req.body.password.length<6){
        return res.render('./users/add',{msg:'Vui lòng nhập mật khẩu trên 6 ký tự'})
    }
    if (req.body.sodienthoai.length<9){
        return res.render('./users/add',{msg:'Vui lòng nhập số điện thoại trên 10 số'})
    }
    let objUser = {
        ten:req.body.ten,
        email : req.body.email,
        password:await bcrypt.hash(req.body.password,salt),
        sodienthoai : req.body.sodienthoai,
        diachi : req.body.diachi,
    }
    //ghi vao csdl
    await  UserModel.create(objUser,function (err){
        if (err)
        {
            console.log(err)
        }else {
            console.log("Save DB thanh cong")
        }
    })
    res.redirect('/users');
}
exports.postEdit = async (req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    if (req.body.ten.length==0 && req.body.email.length==0 && req.body.sodienthoai  == 0 && req.body.diachi  == 0){
        return res.render('./users/edit:id',{msg:'Vui lòng không để trống'})
    }
    if (req.body.sodienthoai.length<9){
        return res.render('./users/edit:id',{msg:'Vui lòng nhập số điện thoại trên 10 số'})
    }
    let du_lieu = {
        ten:req.body.ten,
        email : req.body.email,
        sodienthoai : req.body.sodienthoai,
        diachi : req.body.diachi,
    }
    console.log(du_lieu)
    //goi lenh update
    UserModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }else {
            console.log("update oke")
        }
    })
    res.redirect('/users')
}
exports.postDel = async (req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    UserModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi update'})
        }else {
            console.log("del oke")
        }
    })
    res.redirect('/users')
}
exports.putEdit = async (req,res,next)=>{
    const user = req.user
    // console.log(user)
    let dieu_kien ={
        _id : user._id // id user
    }
    console.log(dieu_kien)
    let du_lieu = {
        ten:req.body.ten,
        email : req.body.email,
        sodienthoai : req.body.sodienthoai,
        diachi : req.body.diachi,
    }
    console.log(du_lieu)
    //goi lenh update
    UserModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }else {
            console.log("update oke")
        }
    })
    return res.json({ success: true });
}

//get user
exports.getUser =(req,res,next)=>{
    res.render('account',{users:req.session.user});
    console.log(req.session.user)
}
//log out
exports.Logout = (req,res,next)=>{
    req.session.destroy(function (){
        console.log("Dang xuat thanh cong");
    });
    res.redirect('/login');
}