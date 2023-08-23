const express = require("express");
const router = express.Router();
const {getCities,getCity,addCity,deleteCity, updateCity} = require('../controllers/cityController');
const { verifyDataCity } = require('../middlewares/verifications');



router.get("/cities", getCities)
router.get("/city/:id", getCity)
router.post("/city",verifyDataCity,addCity)
router.delete("/city/:id",deleteCity)
router.patch("/city/:id",verifyDataCity,updateCity)


module.exports = router