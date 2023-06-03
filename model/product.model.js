const mongoose=require("mongoose")

const productScheema=mongoose.Schema({
    "name": String,
    "description" : String,
    "category" : String,
    "image" :String,
    "location" : String,
    "postedAt" : String,
    "price" : String 
},{
    versionKey:false
})

const ProductModel=mongoose.model("product",productScheema)

module.exports={
    ProductModel
}