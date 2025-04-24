const mongoose =require("mongoose")
const contentSchema= new mongoose.Schema({
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    message:{
        type:"String",
        required:true
    }

})
const Contect=mongoose.model("contect",contentSchema)
module.exports=Contect