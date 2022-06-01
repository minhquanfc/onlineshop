const mongoose = require('mongoose');
const url = "mongodb+srv://minhquanfc:Minhquanfcpro68@cluster0.a207y.mongodb.net/OnlineShop?retryWrites=true&w=majority";
mongoose.connect(url);
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chuoi_ky_ty_bi_mat = process.env.TOKEN_SEC_KEY;
const  bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    ten:'String',
    email:'String',
    password:'String',
    sodienthoai:'String',
    diachi:'String',
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{ collection: 'account' });
userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({ id: user._id}, chuoi_ky_ty_bi_mat);
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new Error({error:'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if (!isPasswordMatch){
        throw new Error({error:'Invalid login credentials'})
    }
    return user
}
const User = mongoose.model("User",userSchema);
module.exports = User;