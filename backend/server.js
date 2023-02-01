const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
// const { errorHandler } = require('../backend/middleware/errorMiddleware'
const { errorHandler } = require('./middleware/errorMiddleWare')
const PORT = process.env.PORT || 8000;
const app = express()
const cors = require('cors')

app.use(cors())

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const mainRoutes = require('./routes/mainRoutes')
//connect to db
connectDB()

//allows us to parse json responses
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello')
})
//Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/', mainRoutes)



app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on ${PORT}`))