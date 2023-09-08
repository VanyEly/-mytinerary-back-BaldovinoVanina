const mongoose = require('mongoose');
const { Schema, model } = require ('mongoose')
// const comentariosSchema = mongoose.Schema.Types.ObjectId;

const itinerarySchema = new mongoose.Schema({
    name: {type: String, required: true },
    nameImg: {type: String, required: true },
    price: { type: Number, min:1, max:3, required: true },
    duration: {type: Number, required: true},
    likes: [{type: mongoose.Types.ObjectId, ref: "User" }],
    hashtags: [{type: String, required: true}],
    comentarios: [
        {
            comentario:{type:String},
            idUsuario:{ type:mongoose.Types.ObjectId, ref:'User' }
        }
    ],
    _city: { type:mongoose.Types.ObjectId, ref:'City' },
   
});

const Itinerary = mongoose.model("itinerary", itinerarySchema);

module.exports = Itinerary;