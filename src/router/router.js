const express = require("express");
const router = express.Router();
const {getCities,getCity,addCity,deleteCity, updateCity} = require('../controllers/cityController');
const { verifyDataCity } = require('../middlewares/verifications');
const { getItineraries, getItinerary, addItinerary, deleteItinerary, updateItinerary } = require('../controllers/itineraryController')


//cities
router.get("/cities", getCities)
router.get("/city/:id", getCity)
router.post("/city",verifyDataCity,addCity)
router.delete("/city/:id",deleteCity)
router.patch("/city/:id",verifyDataCity,updateCity)

//itinerary
router.route('/itinerary')
router.get("/itineraries", getItineraries)
router.get("/itinerary/:id", getItinerary)
router.post("/itinerary",addItinerary)
router.delete("/itinerary/:id",deleteItinerary)
router.patch("/itinerary/:id",updateItinerary)



module.exports = router