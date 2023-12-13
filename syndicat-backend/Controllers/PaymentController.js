const  Payment =require('../Models/Payment')
const User = require('../Models/Users')
const {BadRequestErrorClass,UnauthenticatedErrorClass} = require('../Exceptions')
const {StatusCodes} = require('http-status-codes')
const { v4: uuidv4 } = require('uuid');
const { format, parseISO} = require('date-fns');
const {isValidDate} = require('../Utils/DateValidator')
const Client = require("../Models/Client");


const addPayment = async (req, res)=>{
    const {apartment, month, amount, paymentDate,isPaid, createdBy}=req.body
    if(!apartment || !month || !amount || !paymentDate){
        throw new BadRequestErrorClass("All fields are required")
    }

    if (!isValidDate(month)) {
        throw new BadRequestErrorClass("Invalid date format for month")
    }

    if (!isValidDate(paymentDate)) {
       throw new BadRequestErrorClass({ error: 'Invalid date format for paymentDate' });
    }

    const formattedMonth = format(parseISO(month), 'yyyy/MM/dd');
    const formattedPaymentDate = format(parseISO(paymentDate), 'yyyy/MM/dd');
    const paymentObj = {
        apartment,
        month:formattedMonth,
        amount,
        paymentDate:formattedPaymentDate,
        isPaid,
        createdBy
    }

    await Payment.create(paymentObj)
    res.status(StatusCodes.CREATED).json({msg: 'Success! Your payment has been created'})
}

const updatePayment = async (req, res)=>{
    const {apartment, month, amount, paymentDate,isPaid, _id}=req.body
    if(!apartment || !month || !amount || !paymentDate){
        throw new BadRequestErrorClass("All fields are required")
    }

    if (!isValidDate(month)) {
        throw new BadRequestErrorClass("Invalid date format for month")
    }

    if (!isValidDate(paymentDate)) {
        throw new BadRequestErrorClass({ error: 'Invalid date format for paymentDate' });
    }

    const formatUpdatedMonth = format(parseISO(month), 'yyyy/MM/dd');
    const formatUpdatedPaymentDate = format(parseISO(paymentDate), 'yyyy/MM/dd');

    const payment = await Payment.findOneAndUpdate({_id},{apartment,
        month:formatUpdatedMonth,
        amount,
        paymentDate:formatUpdatedPaymentDate,
        isPaid,},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({payment})
}

const deletePayment = async (req, res)=>{
    await Payment.findOneAndDelete({_id:req.body._id})
    res.status(StatusCodes.OK).json({msg:"Client deleted"})
}

const getPayments = async (req, res)=>{
    try {
        const payments = await Payment.find();
        res.status(StatusCodes.OK).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPaymentById = async(req,res)=>{
    try {
        const payment = await Payment.findById(req.params.paymentId);
        if (!payment) {
            throw new BadRequestErrorClass("Payment Not Found");
        }
        res.status(StatusCodes).json(payment);
    } catch (error) {
        console.error('Error fetching payment by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPaymentsByApartmentId = async(req,res)=>{
    try {
        const payments = await Payment.find({ apartment: req.params.apartmentId });
        res.status(StatusCodes.OK).json(payments);
    } catch (error) {
        console.error('Error fetching payments by apartment ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPaymentByClientId = async(req,res)=>{
    try {
        const payments = await Payment.find({ 'apartment.client': req.params.clientId });
        res.status(StatusCodes).json(payments);
    } catch (error) {
        console.error('Error fetching payments by client ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    addPayment,
    updatePayment,
    deletePayment,
    getPayments,
    getPaymentById,
    getPaymentsByApartmentId,
    getPaymentByClientId
}