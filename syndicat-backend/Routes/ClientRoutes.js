const express = require('express')
const router = express.Router()
const {addClient, updateClient, deleteClient, getClients,getClientById} = require('../Controllers/ClientController')
const authMiddleware = require('../Middlewares/authMiddleware')

// router.post('/login', login)
// router.post('/forgotPassword', forgotPassword)
router.get('/', getClients)
router.post('/add-client', addClient)
router.patch('/update-client',updateClient)
router.delete('/delete-client', deleteClient )
router.get('/:clientSub', getClientById)


module.exports = router
