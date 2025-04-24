const z=require('zod')
const signupSchema= z.object({
    username:z
    .string({required_error:"Name is require"})
    .trim()
    .min(3,{message:"At least 3  characters of Name "})
    .max(20,{message:"Maximum 20 character of Name"}),
    email:z
    .string({required_error:"Email is require"})
    .trim()
    .min(6,{message:"At least 6 characters of Email "})
    .max(30,{message:"Maximum 30 character of Email"}),
    password:z
    .string({required_error:"Password is require"})
    .trim()
    .min(4,{message:"At least 4  characters of Password "})
    .max(20,{message:"Maximum 20 character of Password"}),
    phone:z
    .string({required_error:"Phone is require"})
    .trim()
    .min(11,{message:"At least 11 characters of Phone "})
    .max(20,{message:"Maximum 20 character of Phone"})
})
const loginSchema=z.object({
    email:z
    .string({required_error:"Email is require"})
    .trim()
    .min(6,{message:"At least 6  characters of Email "})
    .max(30,{message:"Maximum 30 character of Email"}),
    password:z
    .string({required_error:"Password is require"})
    .trim()
    .min(4,{message:"At least 4  characters of Password "})
    .max(20,{message:"Maximum 20 character of Password"})
    
})
module.exports={signupSchema,loginSchema}