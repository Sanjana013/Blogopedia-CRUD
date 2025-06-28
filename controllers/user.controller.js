const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.registerUser = async(req, res)=> {
    let {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({success: false, message:"All fields are required!"})
    }else{
        try {
            let user = await User.findOne({email: email})
            if(user){
                return res.status(400).json({success: false, message:"Email already exists!"})
            }else{
                let newUser = await User.insertOne({
                    name: name,
                    email:email,
                    password:password
                })
                return res.status(200).json({success: true, message:"Registration Successful!"})
            }
        } catch (error) {
            return res.status(500).json({success: false, message:error.message})
        }
    }
}
module.exports.loginUser = async(req, res)=> {
    let {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({success: false, message:"All fields are required!"})
    }else{
        try {
            let user = await User.findOne({email: email})
            if(!user){
                return res.status(400).json({success: false, message:"User doesn't exist"})
            }else{
                let isPasswordMatch = await bcrypt.compare(password, user.password)
                if(!isPasswordMatch){
                    return res.status(400).json({success: false, message:"Invalid Password"})
                }
                //  lets create token
                let payload ={
                    _id: user._id,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '24h'})
                return res.status(200).json({success: true, message:"Login Successful", token: token})
            }
        } catch (error) {
            return res.status(500).json({success: false, message:error.message})
        }
    }
    
}
module.exports.profile = (req, res)=> {
    console.log("Profile data");
    res.json({data: req.user})
    
}