const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
   name:{
      type:String,
      required:[true,"please enter the name"] 
   },
   email:{
      type:String,
      required:[true,"please eneter the email"],
      unique:true,
      lowercase:true 
   },
   password:{
      type:String,
      required:[true,"enter the password"]
   }
},{timestamps:true})


const userModel=mongoose.model('User',userSchema)

module.exports=userModel