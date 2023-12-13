const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    residence: {
        type: String,
        required: true,
    },
    floor: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
        unique: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
