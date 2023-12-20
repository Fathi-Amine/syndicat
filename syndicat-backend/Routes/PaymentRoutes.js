const express = require('express')
const router = express.Router()
const {addPayment, updatePayment, deletePayment, getPayments, getPaymentById, getPaymentsByApartmentId,
    getPaymentByClientId
} = require('../Controllers/PaymentController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/add',authMiddleware,addPayment)
router.patch('/update',updatePayment)
router.delete('/delete',deletePayment)
router.get('/',getPayments)
router.get('/:paymentId',getPaymentById)
router.get('/by-apartment/:apartmentId',getPaymentsByApartmentId)
router.get('/by-client/:clientId',getPaymentByClientId)


module.exports = router