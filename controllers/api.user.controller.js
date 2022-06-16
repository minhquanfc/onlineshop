const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const {token} = require("morgan");
const UserModel = require("../models/user.model");

exports.postReg=async (req,res,next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const user = new User(req.body);
        user.password = await bcrypt.hash(req.body.password,salt);

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error){
        console.log(error)
        res.status(400).send(error)
    }
}
exports.postLogin= async (req,res,next)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if (!user){
            return res.status(401).send({error:"login failed! check auth credentials"})
        }
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (error){
        console.log(error)
        res.status(400).send(error)
    }
}
exports.getProfile = (req,res,next) =>{
    res.send(req.user)
}
// logout
exports.postLogout = async  (req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send("Logout thành công")
    } catch (error){
        console.log(error)
        res.status(500).send(error)
    }
}
//logout all thiet bi
exports.postLogoutAll = async (req,res,next)=>{
    try {
        req.user.tokens.splice(0,req.user.tokens.length)
        await  req.user.save()
        res.send("Logout all")
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}