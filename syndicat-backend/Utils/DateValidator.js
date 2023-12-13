const express = require('express');
const { parseISO, format } = require('date-fns');
const {BadRequestErrorClass,UnauthenticatedErrorClass} = require('../Exceptions')
const {StatusCodes} = require('http-status-codes')


const isValidDate = (dateString) => {
    const date = parseISO(dateString);
    return !isNaN(date) && date instanceof Date;
};

module.exports = {
    isValidDate
}