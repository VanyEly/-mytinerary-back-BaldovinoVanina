const City = require ("../models/City");

const getCities = async (req, res) => {


   try {
     // console.log("ejecute la linea city");
        let cities = await   City.find()     
         res.status(200).json(
          {cities}
         )
   } catch (error) {
      res.status(500).json({message: "the cities could not be found"})
   }
 
   }

const getCity = async (req, res) => {

   try {

      let {id}= req.params
     let cityFound =  await City.findById(id)
  
    res.status(200).json(
          {
              "message": "city found",
              "city": cityFound
          }
    )
 
 } catch (error) {
          res.status(500).json({message: error.message})
 }

}

const addCity = async (req, res) => {
try {
         let  payload = req.body
   
        let cityCreado = await  City.create(payload)
   
       res.status(201).json({
      "message": "city has been added",
      "city": cityCreado
       })
   }catch(err){
      res.status(500).json({message: err.message})
   }
   
   }

//method

const deleteCity = async (req, res) => {
  let {id} = req.params  
  try {
     
     let cityOne = await City.deleteOne({_id:id})
  if (cityOne){
     res.status(201).json({
   "message": "city has been delete",
    })
  }else{
   res.status(404).json({message:id})
  }
  
}catch(err){
   res.status(500).json({message: err.message})
}
  
}
 
const updateCity = async (req, res) => {

   try {
        let {id} = req.params  
     const updateCity =  await City.findByIdAndUpdate(id, {$set : req.body})
     res.status(201).json({
    message: "city has been updated",
    updateCity })
  
   }catch(err){
   res.status(500).json({message:"There was an error updating"});
 }

}

const searchCity = async (req, res) => {
   try {
     let queries = {};
     if (req.query.name) {
       queries.name = new RegExp('^'+ req.query.name, 'i');
     }
     const cities = await City.find(queries);
     res.status(201).json({
       message: "Cities found",
       cities: cities
     });
   } catch (err) {
     res.json({ message: "The cities could not been found"})
   }
 };

module.exports = {
   getCities,
    getCity,
    addCity,
    deleteCity,
   updateCity,
   searchCity
   } 