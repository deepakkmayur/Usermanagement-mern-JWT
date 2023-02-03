const Goal=require('../model/goalModel')
const asyncHandler=require("express-async-handler")
const User=require('../model/userModel')  

const getGoals=asyncHandler(async(req,res)=>{
  console.log("///////////////////////////////");
  console.log(req.user,"//////////////////////////////////////////////////////////////");
  const goals=await Goal.find({user:req.user._id})
  if(goals.length!=0){
    res.status(200).json(goals)
  }else{
    res.status(400)
    throw new Error("no goal found")
  }
})
       
const createGoal=asyncHandler(async (req,res)=>{    
  const {name,number}=req.body
  if(name&&number){
    const goal=await Goal.create({name,number,user:req.user._id})  

    if(goal){
      res.status(200).json({message:"goal created",goal}) 
    }else{
      res.status(500)
      throw new Error("goal not created")
    }

  }else{
   res.status(400)
   throw new Error("enter the data properly")
  }
})



const uppdateGoal=asyncHandler(async (req,res)=>{
  const goal=await Goal.findById({_id:req.params.id})
  if(goal){
    const user=await User.findById({_id:req.user._id})
    //checking user id matches
    if(goal.user.toString()===user._id.toString()){
      const updatedGoal=await Goal.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
      res.status(200).json({message:"updated",updatedGoal}) 
   }else{
      res.status(401)
      throw new Error("user id not matching")  
   }
  }else{
     res.status(404)
     throw new Error("no goal found")     
  }     
})

const deleteGoal=asyncHandler(async(req,res)=>{
   
 const goal=await Goal.findById({_id:req.params.id})
  if(goal){
    const user=await User.findById({_id:req.user._id})
     if(user._id.toString()===goal.user.toString()){
      await Goal.findById({_id:req.params.id}).deleteMany()
      res.status(200).json({message:"goal deleted"})
     }else{
       res.status(401)
       throw new Error("user id not matching")
     }
  }else{
    res.status(400)
    throw new Error("no goal found")
  }
 })

module.exports={getGoals,createGoal,uppdateGoal,deleteGoal}