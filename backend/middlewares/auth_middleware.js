const jwt=require('jsonwebtoken')
const User=require('../models/User_model')
const key=process.env.jwt_key

const Authentication= async(req,res,next )=>{

try {
const token=req.header("Authorization")
const newToken=token.replace("Bearer ","")
const isVerified=jwt.verify(newToken,key)
const userData= await User.findOne({email:isVerified.email}).select({password:0})
req.user=userData;
req.token=token;
req.userID=User._id
console.log()
next()
} catch (error) {
    console.log("middleware error ",error)
}

}
module.exports=Authentication