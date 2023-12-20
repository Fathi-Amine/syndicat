const { addApartment } = require("../Controllers/AppartementController");
const { updateApartment } = require("../Controllers/AppartementController");
const { getApartments } = require("../Controllers/AppartementController");
const { getApartmentById } = require("../Controllers/AppartementController");
const Apartment = require("../Models/Appartement");
const { BadRequestErrorClass } = require("../Exceptions/badRequest");
const { StatusCodes } = require("http-status-codes");

describe("addApartment function", () => {
    it("should create an apartment and return a success message", async () => {
        const req = {
            body: {
                number: "123",
                residence: "Test Residence",
                floor: "1",
                building: "Test Building",
                client: "Test Client",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Apartment.create = jest.fn();

        await addApartment(req, res);

        expect(Apartment.create).toHaveBeenCalledWith({
            number: "123",
            residence: "Test Residence",
            floor: "1",
            building: "Test Building",
            client: "Test Client",
        });

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith({
            msg: "Apartment created successfully",
        });
    });

    it("should throw an error if any required field is missing", async () => {
        const req = {
            body: {
                number: "123",
                residence: "Test Residence",
                floor: "1",
                building: "Test Building",
                // client field is missing
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(addApartment(req, res)).rejects.toThrow(
            BadRequestErrorClass
        );

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("updateApartment function", () => {
    it("should update an apartment and return the updated apartment", async () => {
        const req = {
            body: {
                number: "123",
                residence: "Test Residence",
                floor: "1",
                building: "Test Building",
                client: "Test Client",
                _id: "apartmentId",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const apartmentObj = {
            number: "123",
            residence: "Test Residence",
            floor: "1",
            building: "Test Building",
            client: "Test Client",
        };

        Apartment.findOneAndUpdate = jest.fn().mockReturnValue(apartmentObj);

        await updateApartment(req, res);

        expect(Apartment.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "apartmentId" },
            { ...apartmentObj },
            { new: true, runValidators: true }
        );

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(apartmentObj);
    });

    it("should throw an error if any required field is missing", async () => {
        const req = {
            body: {
                number: "123",
                residence: "Test Residence",
                floor: "1",
                building: "Test Building",
                // client field is missing
                _id: "apartmentId",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(updateApartment(req, res)).rejects.toThrow(
            BadRequestErrorClass
        );

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("getApartments function", () => {
    it("should return all apartments with populated client field", async () => {
        const apartments = [
            {
                number: "123",
                residence: "Test Residence",
                floor: "1",
                building: "Test Building",
                client: {
                    name: "Test Client",
                    email: "test@example.com",
                },
            },
            {
                number: "456",
                residence: "Test Residence 2",
                floor: "2",
                building: "Test Building 2",
                client: {
                    name: "Test Client 2",
                    email: "test2@example.com",
                },
            },
        ];

        Apartment.find = jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue(apartments),
        });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getApartments(req, res);

        expect(Apartment.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(apartments);
    });
});
describe("getApartmentById function", () => {
    it("should return the apartment with populated client field", async () => {
        const apartment = {
            _id: "apartmentId",
            number: "123",
            residence: "Test Residence",
            floor: "1",
            building: "Test Building",
            client: {
                name: "Test Client",
                firstName: "John",
                lastName: "Doe",
                _sub: "sub123",
                email: "test@example.com",
            },
        };

        Apartment.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue(apartment),
        });

        const req = {
            params: {
                apartmentId: "apartmentId",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getApartmentById(req, res);

        expect(Apartment.findOne).toHaveBeenCalledWith({
            _id: "apartmentId",
        });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(apartment);
    });
});
