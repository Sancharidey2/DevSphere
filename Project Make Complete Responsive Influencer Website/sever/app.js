const express  = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

//routes
const userRoutes = require('./routes/user')


const PORT = process.env.PORT || 5000
const {DB_URL} = require('./config/keys')
//middleware
app.use(express.json())
// app.use(morgan('tiny'))
app.use(cors())

mongoose.connect(DB_URL).then(()=>{
    console.log('mongo is connected')
}).catch((e)=>{
    console.log(e)
})

//routes
app.use('/',userRoutes)

//starting server
app.listen(PORT,()=>{
    console.log('listening on port 5000')
})