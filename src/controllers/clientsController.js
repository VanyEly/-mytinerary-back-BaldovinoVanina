


const getClients = (req, res) => {

    res.json({
     clients: [
        {
           name: "john",
           lastName: "Johnson",
           age: "16"
        },
        {
         name: "Peter",
         lastName: "Johnson",
         age: "18"
      }        
     ]


    })
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

module.exports = {
   getClients,
    getClient
   }