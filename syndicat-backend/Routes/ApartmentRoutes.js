const express = require('express')
const router = express.Router()
const {addApartment, updateApartment, getApartments, getApartmentById, deleteApartment} = require('../Controllers/AppartementController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/add', addApartment)
router.patch('/update-apartment', updateApartment)
router.delete('/delete', deleteApartment)
router.get('/', getApartments)
router.get('/:apartmentId', getApartmentById)


module.exports = router