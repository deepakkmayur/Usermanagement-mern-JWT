const express=require('express')
const {getGoals,createGoal,uppdateGoal,deleteGoal}=require('../controllers/goalController')
const protect=require('../middleware/authMiddleware')
const router=express.Router()

router.get('/all',protect,getGoals)
router.post('/all',protect,createGoal)
router.put('/all/:id',protect,uppdateGoal) 
router.delete('/all/:id',protect,deleteGoal)    


module.exports=router