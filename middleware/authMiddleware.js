const asyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')
const User=require('../model/userModel')


const protect=asyncHandler(async(req,res,next)=>{
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      
      //get token from headers
      const token=req.headers.authorization.split(' ')[1]
      
      // decode and verify token
      const decodeToken=await jwt.verify(token,process.env.JWT_SECRET)
      
      //assigning user details to req.user
      req.user=await User.findById({_id:decodeToken.userId}).select('-password')  

     next()
     } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error("not authorized")
     }
  }else{
   res.status(401)
   throw new Error("not authorized, no token")
  }

}
)




module.exports=protect
