const express = require("express");
const router = express.Router();
const {getCities,getCity,addCity,deleteCity, updateCity} = require('../controllers/cityController');
const { verifyDataCity } = require('../middlewares/verifications');
const { getItineraries, getItinerariesByCity, addItinerary, getItinerary, updateItinerary, deleteItinerary } = require('../controllers/itineraryController');


//cities
router.get("/cities", getCities)
router.get("/city/:id", getCity)
router.post("/city",verifyDataCity,addCity)
router.delete("/city/:id",deleteCity)
router.patch("/city/:id",verifyDataCity,updateCity)



//itinerary
router.get("/itineraries", getItineraries)
router.get("/itineraries/:id", getItinerariesByCity)
router.post("/itinerary/:id", addItinerary)
router.get("/itinerary/:id", getItinerary)
router.put("/itinerary/:id", updateItinerary)
router.delete("/itinerary", deleteItinerary)


module.exports = router