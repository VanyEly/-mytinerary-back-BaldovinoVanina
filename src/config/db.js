const { connect } = require('mongoose');

const URI ="mongodb+srv://vanyely:SIbkYM69pfwZw9ag@cluster0.tzjqgux.mongodb.net/?retryWrites=true&w=majority"


connect(URI)
.then (() =>{
console.log("Connect success to database")
})
.catch(() =>{
    console.log("Error connecting to database")
})



