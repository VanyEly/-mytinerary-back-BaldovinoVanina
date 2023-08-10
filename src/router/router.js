const express = require('express')
const router = express.Router()
const {getClient,getClients} = require('../controllers/clientsController')


router.get("/clients", getClients)
router.get("/client/:id", getClient)



module.exports = router