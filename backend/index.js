require('dotenv').config();
const express=require('express');
const error_middleware=require('./middlewares/error_middleware')
const app= express();
const auth_router=require('./routes/auth_routes')
const contect_route=require("./routes/contect-routes")
const note_router=require('./routes/note_routes')
const connectDb=require('./utilits/db')
const cors=require('cors')

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/auth/',auth_router)
app.use('/api/form/',contect_route)
app.use('/api/notes/',note_router)
app.use(error_middleware)

connectDb().then(()=>{

    const port=5000
    app.listen(port,()=>{
        console.log(`server runing at ${port}`)
    })
})