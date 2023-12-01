const express = require('express')
const app = express()
require('dotenv').config({path:'./config.env'})

const connectDb = require('./db/db')
const routerUser = require('./routes/userRoutes')
const routerCategory = require('./routes/categoryRoutes')
const routerProduct = require('./routes/productroutes')

// const PostRoutes = require('./routes/postRoutes')
const cors = require('cors')
const port =  process.env.PORT || 8080
//cors
app.use(cors())
//connectDB
connectDb()
//middleware
app.use(express.json())
app.use('/api/user',routerUser)
app.use('/api/category',routerCategory)
app.use('/api/product',routerProduct)


// app.use('/api/post',PostRoutes)

//routes
//connect app
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})