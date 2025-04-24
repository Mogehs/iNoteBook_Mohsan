const contect=require("../models/Contect_model")
const ContectDaTA= async(req,res,next)=>{
try {
    const responce=req.body
 const details=  await contect.create(responce)
res.status(201).json({message:"Contect Send",details})
} catch (error) {
    console.log(error)
    next(error)
}
} 
module.exports=ContectDaTA