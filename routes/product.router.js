const express=require("express")

const {ProductModel}=require("../model/product.model")

const productRouter=express.Router()

productRouter.post("/add",async(req,res)=>{
    const data=req.body
    try{
        const product=new ProductModel(data)
        await product.save()
        console.log(product)
        res.send("Product is added")
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})

















// --------------------------Product EDIT----------------------------



productRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        const product=await ProductModel.findByIdAndUpdate({_id:id},data)
        console.log(product)
        res.send("The product is Updated")   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})









// -----------------------------Product DELETE------------------.



productRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const product=await ProductModel.findByIdAndDelete({_id:id})
        res.send("The product is Deleted")   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})




// ------------------------ALL PRODUCT---------------------



productRouter.get("/",async(req,res)=>{
    const query=req.query
    try{
        const product=await ProductModel.find(query)
        res.send(product)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})




module.exports={
    productRouter
}