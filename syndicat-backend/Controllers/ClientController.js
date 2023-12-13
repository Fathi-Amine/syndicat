const  Client =require('../Models/Client')
const {BadRequestErrorClass,UnauthenticatedErrorClass} = require('../Exceptions')
const {StatusCodes} = require('http-status-codes')
const { v4: uuidv4 } = require('uuid');
const addClient = async(req, res)=>{
    const {firstName, lastName,email} = req.body
    const isExisting = await Client.find({email})
    if(isExisting.length !== 0){
        throw new BadRequestErrorClass("this email already exists")
    }
    if(!firstName || !lastName){
        throw new BadRequestErrorClass("Please Provide a first and last name")
    }
    const name = firstName + ' ' + lastName
    const clientObj = {
        name,
        firstName,
        lastName,
        email
    }
    await Client.create(clientObj)
    res.status(StatusCodes.CREATED).json({msg: 'Success! Your client has been created'})
}

const updateClient = async (req, res)=>{
    const {firstName, lastName, email, _sub} = req.body
    if (!firstName || !lastName || !email){
        throw new BadRequestErrorClass("Please Provide an email a first and last name")
    }
    const name = firstName + ' ' + lastName
    const client = await Client.findOneAndUpdate({_sub},{name,firstName,lastName,email},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({client})
}

const deleteClient = async (req,res)=>{
    await Client.findOneAndDelete({_sub:req.body._sub})
    res.status(StatusCodes.OK).json({msg:"Client deleted"})
}

const getClients = async (req, res) => {
    const clients = await Client.find()
    res.status(StatusCodes.OK).json({clients})
}

const getClientById = async(req, res)=>{
    const client = await Client.findOne({_sub:req.params.clientSub})
    if (!client) {
        throw new BadRequestErrorClass("Client Not Found")
    }

    res.status(200).json(client);
}
module.exports = {
    addClient,
    updateClient,
    deleteClient,
    getClients,
    getClientById
}