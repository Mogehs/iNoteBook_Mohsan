const z=require("zod")
const contectSchema=z.object({
     username:z
        .string({required_error:"Name is require"})
        .trim()
        .min(3,{message:"At least 3  characters of Name "})
        .max(20,{message:"Maximum 20 character of Name"}),
        email:z
        .string({required_error:"Email is require"})
        .trim()
        .min(12,{message:"At least 12 characters of Email "})
        .max(30,{message:"Maximum 30 character of Email"}),
        message:z
        .string({required_error:"message is require"})
        .trim()
        .min(10,{message:"At least 10 characters of message "})
        .max(80,{message:"Maximum 80 character of message"}),
})
module.exports=contectSchema