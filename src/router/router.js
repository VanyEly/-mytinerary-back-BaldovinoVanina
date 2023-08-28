const express = require("express");
const router = express.Router();
const {getCities,getCity,addCity,deleteCity, updateCity} = require('../controllers/cityController');
const { verifyDataCity } = require('../middlewares/verifications');
const itinerariosControllers = require('../controllers/itineraryController')

const {obtenerTodosIt,agregarItinerario,obtenerUnIt,borrarItinerario,modificarItinerario,obtenerItinerariosPorCiudad,borrarComentario,modificarComentario,agregarComentarios,likearItinerario} = itinerariosControllers

//cities
router.get("/cities", getCities)
router.get("/city/:id", getCity)
router.post("/city",verifyDataCity,addCity)
router.delete("/city/:id",deleteCity)
router.patch("/city/:id",verifyDataCity,updateCity)

//itinerary
router.route('/itinerarios')
.get(obtenerTodosIt)
//.post(passport.authenticate('jwt',{session:false}),agregarItinerario)

router.route('/itinerario/:idCiudad')
.get(obtenerItinerariosPorCiudad)

router.route('/itinerarios/:id')
.get(obtenerUnIt)



module.exports = router