const asyncHandler=require('express-async-handler')
const Goal = require('../Models/goalModel')

exports.getGoals=asyncHandler(async(req,res)=>{

    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
 
})
exports.CreateGoals= asyncHandler(async(req,res)=>{
    const goal = await Goal.create({
        text:req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(goal)

})
exports.DeleteGoals=asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400) 
        throw new Error ('Goal not found')
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
      }
    
      // Make sure the logged in user matches the goal user
      if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
    await goal.remove()
    res.status(200).json({ id: req.params.id })

})
exports.updateGoals=asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400) 
        throw new Error ('Goal not found')
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    
    res.status(200).json(updatedGoal)

})