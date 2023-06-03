const express=require("express")
const { UserModel }= require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    try{
        bcrypt.hash(password,5,async(req,hash)=>{
            const user=new UserModel({email,password:hash})
            await user.save()
            console.log(user)
            res.send("Signup Successful")  
        })
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


userRouter.post("/login" , async(req,res)=>{
    const {email,password} =req.body
    try{
        const user=await UserModel.findOne({email})
        if(!user){
            res.send("Invalid user")
        }
        const hashpass=user?.password
        bcrypt.compare(password,hashpass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"MASAI")
                res.send({"Msg":"Login Successful",token})
            }else{
                res.send("Wrong credeintials")
            }
        })
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})




// --------------------get user-----------------------


userRouter.get("/",async(req,res)=>{
    const query=req.query
    try{
        const product=await UserModel.find(query)
        res.send(product)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


module.exports={
    userRouter
}