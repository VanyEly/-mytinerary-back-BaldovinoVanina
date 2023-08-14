const { Schema, model } = require ('mongoose')


const schemaClient = new Schema({
    name: {
        type: String,
        required: true,
        //dtos de las ciudades name y detailes
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
})


const Client = model("Client", schemaClient)

module.exports = Client