const mongoose=require('mongoose')  
const connectDB=()=>{mongoose.connect(process.env.MONGO_CONNECT).then(
   ()=>console.log("db connected")).catch((err)=>console.log("dc connection error",err))}

module.exports=connectDB