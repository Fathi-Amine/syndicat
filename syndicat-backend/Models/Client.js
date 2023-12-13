const mongoose = require('mongoose');
const validator = require("validator");
const { v4: uuidv4 } = require('uuid');

const clientSchema = new mongoose.Schema({
    _sub: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email"
        }
    },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
