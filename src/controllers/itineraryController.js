const Itinerary = require("../models/Itinerary");


 
const getItineraries = async (req, res) => {


  try {
    // console.log("ejecute la linea city");
       let itineraries = await   Itinerary.find()     
        res.status(200).json(
         {itineraries}
        )
  } catch (error) {
     res.status(500).json({message: "the itineraries could not be found"})
  }

  }

const getItinerary = async (req, res) => {

const {id} = req.params
try {
  let  {id} = req.params

 let itineraryEncontrado = await Itinerary.findById(id)
  
 res.status(200).json({itineraryEncontrado: itineraryEncontrado})

}catch(err){
res.status(500).json({message: err.message})
}



}

const addItinerary = async (req, res) => {
try {
        let  payload = req.body
  
       let itineraryCreado = await  Itinerary.create(payload)
  
      res.status(201).json({
     "message": "itinerary has been added",
     "itinerary": itineraryCreado
      })
  }catch(err){
     res.status(500).json({message: err.message})
  }
  
  }

//method

const deleteItinerary = async (req, res) => {
 let {id} = req.params  
 try {
    
    let itineraryOne = await Itinerary.deleteOne({_id:id})
 if (itineraryOne){
    res.status(201).json({
  "message": "itinerary has been delete",
   })
 }else{
  res.status(404).json({message:id})
 }
 
}catch(err){
  res.status(500).json({message: err.message})
}
 
}

const updateItinerary = async (req, res) => {

  try {
       let {id} = req.params  
    const updateItinerary =  await Itinerary.findByIdAndUpdate(id, {$set : req.body})
    res.status(201).json({
   message: "itinerary has been updated",
   updateItinerary })
 
  }catch(err){
  res.status(500).json({message:"There was an error updating"});
}
  
}


module.exports = {
  getItineraries,
   getItinerary,
   addItinerary,
   deleteItinerary,
  updateItinerary
  } 