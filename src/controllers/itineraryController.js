const City = require('../models/City.js')
const Itinerary =require('../models/Itinerary.js')


const addItinerary = async (req, res ) =>{
    try {
        let {id} =req.params
        let cityFound = await City.findById(id)

         let itineraryInfo = req.body
            let newItinerary = await Itinerary.create({...itineraryInfo, _city:cityFound})
      /*   let newItinerary = await itinerary.create({

            name: "The light city at night",
            userName: "Lina Deron",
            userImage: "req.body.userImage",
            price: 10,
            duration: "3",
            likes:["lina","joseph","ruth"],
            hashtags: ["travel","paris", "eiffel"],
            city: cityFound
        }) */
        
        await cityFound.updateOne({ _itineraries:[...cityFound._itineraries, newItinerary]})

        const cityFoundUpdated = await City.findById(id).populate("_itineraries")
       

        
        
            res.status(200).json({
                message: "added itinerary to city",
                itinerary: cityFoundUpdated
        })
        
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

/* Get all the itineraries on the collection*/

const getItineraries = async (req, res) =>{
   
   try {
       let itineraries =  await Itinerary.find().populate('_city')
    
            res.status(200).json(
            {itineraries}
      )
    
   } catch (error) {
            res.status(500).json({message: error.message})
   }
   
}

/* Get one itinerary by Id controller using queries */
const getItinerary = async (req, res) =>{
   try {

        let {id}= req.params
        let itineraryFound =  await Itinerary.findById(id)
    
      res.status(200).json(
            {
                "message": "itinerary found",
                "Itinerary": itineraryFound
            }
      )
   
   } catch (error) {
            res.status(500).json({message: error.message})
   }
   
}

/* Get one itinerary by Id controller using queries */
const getItinerariesByCity = async (req, res) =>{
   try {

        let {id}= req.params
     
        
            
            let itinerariesFound =  await Itinerary.find({_city:id})
            
            if(itinerariesFound.length == 0){
              return  res.status(404).json(
                  {
                      "message": "itinerary not found",
                      
                  })
                  
        
        } 
         return res.status(200).json(
              {
                  "message": "itinerary found",
                  "Itinerary": itinerariesFound
              })
      
   
   } catch (error) {
            res.status(500).json({message: error.message})
   }
   
}




/* Update info on an itinerary using req body controller */
const updateItinerary = async (req, res) =>{
   try {
        let updateData = {
            name: req.body.name,
           
            nameImg: req.body.nameImg,
            price: req.body.price,
            duration: req.body.duration,
            likes: req.body.likes,
            hastags: req.body.hastags,
        }

        let {id}= req.params /* using params to find the object to update */
       let itineraryToUpdate =  await Itinerary.findByIdAndUpdate({_id: id}, updateData)
    
      res.status(200).json(
            {
                "message": "itinerary updated",
                "city": itineraryToUpdate
            }
      )
    
   } catch (error) {
            res.status(500).json({message: error.message})
   }
   
}

/* Delete one itinerary  using ID query controller */
const deleteItinerary = async (req, res) =>{
    try {
        
         let {id}= req.query
        let itineraryToDelete =  await Itinerary.deleteOne({_id: id})
     
       res.status(200).json(
             {
                 "message": "itineray removed",
                 "city": itineraryToDelete
             }
       )
     
    } catch (error) {
             res.status(500).json({message: error.message})
    }
    
 }








module.exports = {getItineraries, 
  getItinerary,
   addItinerary,
    updateItinerary,
     deleteItinerary,
     getItinerariesByCity}