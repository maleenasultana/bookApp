const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('./models/books.model')
require('./models/user.model')

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

mongoose.connect("mongodb://localhost:27017/book-rental-app",
() => { console.log(" Connected to Mongoose")})

require('./routes/book.routes')(app)
require('./routes/user.routes')(app)
require('./routes/rent.routes')(app)

app.listen(5001, () => {
    console.log("Server started on port 5001")
})
