const {
    addClient,
    updateClient,
    deleteClient,
} = require("../Controllers/ClientController");
const Client = require("../Models/Client");
const { StatusCodes } = require("http-status-codes");
const { BadRequestErrorClass } = require("../Exceptions/badRequest");

jest.mock("../Models/Client");

describe("addClient function", () => {
    it("should create a new client if the email is unique and first/last name are provided", async () => {
        const req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const isExisting = [];
        // Client.find.mockResolvedValue(isExisting);
        Client.find.mockImplementation(() => Promise.resolve([]));
        Client.create.mockResolvedValue();

        await addClient(req, res);

        expect(Client.find).toHaveBeenCalledWith({
            email: "john.doe@example.com",
        });
        expect(Client.create).toHaveBeenCalledWith({
            name: "John Doe",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
        });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith({
            msg: "Success! Your client has been created",
        });
    });
});

describe("updateClient function", () => {
    it("should update the client's information if all required fields are provided", async () => {
        const req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                _sub: "client_id",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const client = {
            _id: "client_id",
            name: "John Doe",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
        };

        Client.findOneAndUpdate.mockResolvedValue(client);

        await updateClient(req, res);

        expect(Client.findOneAndUpdate).toHaveBeenCalledWith(
            { _sub: "client_id" },
            {
                name: "John Doe",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            },
            { new: true, runValidators: true }
        );
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ client });
    });

    it("should throw an error if any of the required fields are missing", async () => {
        const req = {
            body: {
                firstName: "John",
                lastName: "Doe",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(updateClient(req, res)).rejects.toThrow(
            BadRequestErrorClass
        );

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("deleteClient function", () => {
    it("should delete the client if the _sub field is provided", async () => {
        const req = {
            body: {
                _sub: "client_id",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const client = {
            _id: "client_id",
            name: "John Doe",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
        };

        Client.findOneAndDelete.mockResolvedValue(client);

        await deleteClient(req, res);

        expect(Client.findOneAndDelete).toHaveBeenCalledWith({
            _sub: "client_id",
        });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ msg: "Client deleted" });
    });
});
