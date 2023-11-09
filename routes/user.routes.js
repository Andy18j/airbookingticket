const express = require("express")
const {userModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,password}= req.body

        const user = await userModel.findOne({email})
        if (user){
            return res.status(401).json({msg:"this user are already present !! Try another Email address"})
        
        }
        const hash =await bcrypt.hash(password,8)
        const newUser = new userModel ({name,email,password:hash})

        await newUser.save()

        res.status(201).json({msg:"register Sucessfully "})

    }
    catch(err){
        res.status(401).json({msg:"Something Went Wrong"})
        console.log(err)
    }
})
userRouter.get("/users",async(req,res)=>{
    try{
        const data = await userModel.find()
        res.status(200).json({msg:"all users are here!!",user:data})
    }
    catch(err){
        console.log(err)
        res.status(402).json({msg:'something went wrong to getting the users'})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body
        const isuserpresent = await userModel.findOne({email})

        if (!isuserpresent){
            return res.status(401).json({msg:"This user are not present! Please register first"})
        }
        const ispasswordcorrct = await bcrypt.compare(password,isuserpresent.password)

        const token = jwt.sign({userId:isuserpresent._id},"secret",{
            expiresIn:"4min"
        })
        if (ispasswordcorrct){
            return res.status(201).json({msg:"Login Sucessfully",token})
        }

    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"Wrong Credentials "})
    }
})


module.exports = {
    userRouter
}