const mongoose= require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require("bcrypt");
const key=process.env.jwt_key
const UserSchema= new mongoose.Schema({
   username:{
    type:"String",
    required:true,

   },
   email:{
    type:"String",
    required:true,

   }, 
   password:{
    type:"String",
    required:true,

   },
   phone:{
    type:"String",
    required:true,

   },
})

// UserSchema.pre('save',  async function( next){
// const user=this
// if(!user.isModified("password")){
//    next();
// }
// try {
//    const saltRound= bcrypt.genSalt(10)
//    const hash_pass= await bcrypt.hash(user.password,saltRound)
//    console.log(hash_pass)
//    user.password=hash_pass

// } catch (error) {
//    console.log(error)
// }
// })
UserSchema.methods.generateToken= async function() {
   try {
      return jwt.sign({
         username:this.username,
        userID:this._id.toString(),
        email:this.email 
      },
  key, 
{
   expiresIn:'30d'
})
      
   } catch (error) {
      console.error(error)
      
   }
}

const User=mongoose.model("user",UserSchema)
module.exports=User;