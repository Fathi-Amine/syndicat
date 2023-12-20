const  Client =require('../Models/Client')
const {BadRequestErrorClass,UnauthenticatedErrorClass} = require('../Exceptions')
const {StatusCodes} = require('http-status-codes')
const { v4: uuidv4 } = require('uuid');
const addClient = async(req, res)=>{
    const { firstName, lastName, email } = req.body;

    const isExisting = await Client.findOne({ email });
    if (isExisting) {
        throw new BadRequestErrorClass("This email already exists");
    }

    if (!firstName || !lastName) {
        throw new BadRequestErrorClass("Please provide a first and last name");
    }

    const name = firstName + ' ' + lastName;
    const _sub = uuidv4()
    console.log(_sub)

    // Create the client object without explicitly setting _sub
    const clientObj = {
        _sub,
        name,
        firstName,
        lastName,
        email,
    };

    try {
        // Create a new client without providing _sub (it will be automatically generated)
        const newClient = await Client.create(clientObj);

        // Respond with success message
        res.status(StatusCodes.CREATED).json({ msg: 'Success! Your client has been created', client: newClient });
    } catch (error) {
        // Handle any errors that occur during the creation process
        console.error(error);
        throw new InternalServerErrorClass("Failed to create a new client");
    }
}

const updateClient = async (req, res)=>{
    const {firstName, lastName, email, _sub} = req.body
    if (!firstName || !lastName || !email){
        throw new BadRequestErrorClass("Please Provide an email a first and last name")
    }
    const name = firstName + ' ' + lastName
    const client = await Client.findOneAndUpdate({_sub},{name,firstName,lastName,email},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({client,msg:"Client updated successfully"})
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