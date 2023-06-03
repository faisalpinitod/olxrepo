const express=require("express")
const { connection } = require("./config/db")
const { userRouter} = require("./routes/user.router")
const { productRouter } = require("./routes/product.router")
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to the OLX")
})

app.use("/user",userRouter)
app.use("/product",productRouter)

app.listen(7000,async()=>{
    try{
        await connection
        console.log("The DB is connected to the server")
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
    console.log("The server is listning at port 7000")
})