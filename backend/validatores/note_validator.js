const z=require('zod')
const Note_Schema=z.object({
    title:z
            .string({required_error:"Title is require"})
            .trim()
            .min(6,{message:"At least 6 characters of title "})
            .max(15,{message:"Maximum 15 character of title"}),
            description:z
            .string({required_error:"Discription is require"})
            .trim()
            .min(10,{message:"At least 10 characters of Note "})
            .max(100,{message:"Maximum 100 character of Note"})
})
module.exports= Note_Schema