const mongoose=require('mongoose')

const goalSchema=mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
   },
   name:{
      type:String,
      required:true 
   },
   number:{   
      type:Number,
      required:true
   }
},{timestamps:true})
const goalModel=mongoose.model('goal',goalSchema)

module.exports=goalModel