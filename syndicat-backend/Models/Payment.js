const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true,
    },
    month: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    }
},
    {
        timestamps: true,

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
