const Client = require ("../models/Client")

const getClients = async (req, res) => {


   try {
        let clients = await  Client.find()     
         res.status(200).json(
          clients
         )
   } catch (error) {
      res.status(500).json({message: err.message})
   }
 
   }

const getClient = (req, res) => {

const {id} = req.params


const {data} = req.query
if(data){
   res.json(
       {
          name: "john",
          lastName: "Johnson",
          age: "16",
          paramId: id,
          queryData: data
       })
}else{
   res.json(
      {
         name: "john",
         lastName: "Johnson",
         age: "16",
         paramId: id
      })
}



}

const addClient = async (req, res) => {
try {
      let  payload = req.body

     let clientCreado = await new Client.create(payload)

    res.status(201).json({
   "message": "cliente has been added",
   "client": clientCreado
    })
}catch(err){
   res.status(500).json({message: err})
}

}
//method

module.exports = {
   getClients,
    getClient,
    addClient
   }