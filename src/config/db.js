const { connect } = require('mongoose')
require('dotenv').config({path:'./.env'})


const URI = process.env.MONGO_URI




connect(URI)
.then (() =>{
console.log("Connect success to database")
})
.catch(() =>{
    console.log("Error connecting to database")
})



