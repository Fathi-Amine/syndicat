const express = require('express')
const router = express.Router()
const {addApartment, updateApartment, getApartments, getApartmentById} = require('../Controllers/AppartementController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/add', addApartment)
router.patch('/update-apartment', updateApartment)
router.get('/', getApartments)
router.get('/:apartmentId', getApartmentById)


module.exports = router