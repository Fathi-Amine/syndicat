const  Apartment =require('../Models/Appartement')
const {BadRequestErrorClass,UnauthenticatedErrorClass} = require('../Exceptions')
const {StatusCodes} = require('http-status-codes')

const addApartment = async(req, res)=>{
    const {number, residence, floor, building, client} = req.body
    if(!number || !residence || !floor || !building || !client){
        throw new BadRequestErrorClass("All fields must be filled")
    }
    const apartmentObj = {
        number,
        residence,
        floor,
        building,
        client
    }
    await Apartment.create(apartmentObj)
    res.status(StatusCodes.CREATED).json({msg: 'Apartment created successfully'})
}

const updateApartment = async(req, res)=>{
    const {number, residence, floor, building, client, _id} = req.body
    if(!number || !residence || !floor || !building || !client){
        throw new BadRequestErrorClass("All fields must be filled")
    }
    const apartmentObj = {
        number,
        residence,
        floor,
        building,
        client
    }
    const apartment = await Apartment.findOneAndUpdate({_id},{...apartmentObj},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json(apartment)
}

const getApartments = async(req, res) => {
  const apartments = await Apartment.find().populate("client")
    res.status(StatusCodes.OK).json(apartments)
}

const getApartmentById = async (req, res)=>{
    const apartment = await Apartment.findOne({_id:req.params.apartmentId}).populate({
        path: 'client',
        select: '-_id name firstName lastName _sub email',
    })
    res.status(StatusCodes.OK).json(apartment)
}
module.exports = {
    addApartment,
    updateApartment,
    getApartments,
    getApartmentById
}