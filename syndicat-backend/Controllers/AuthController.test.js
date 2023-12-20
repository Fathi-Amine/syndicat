const { register } = require("../Controllers/AuthController");
const User = require("../Models/Users");
const { sendVerificationEmail } = require("../Utils/SendVerificationEmail");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

jest.mock("../Models/Users");
jest.mock("../Utils/SendVerificationEmail");
jest.mock("jsonwebtoken");

describe("register function", () => {
    it("should create a new user, generate a verification token, and send a verification email", async () => {
        const req = {
            get: jest.fn().mockReturnValue("http://example.com"),
            body: {
                username: "testuser",
                email: "test@example.com",
                // other required fields
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const userToken = { name: "testuser", email: "test@example.com" };
        const verificationToken = "mockedVerificationToken";

        // Assuming sendVerificationEmail is a function in a module called emailService
        // Mock the module before requiring it
        jest.mock("../Utils/index", () => ({
            sendVerificationEmail: jest.fn(),
        }));

        // Now require the module
        const { sendVerificationEmail } = require("../Utils/index");

        // Now you can use sendVerificationEmail in your tests
        sendVerificationEmail.mockResolvedValue();

        jwt.sign.mockReturnValue(verificationToken);
        User.create.mockResolvedValue({});
        sendVerificationEmail.mockResolvedValue();

        await register(req, res);

        expect(req.get).toHaveBeenCalledWith("origin");
        expect(User.create).toHaveBeenCalledWith({
            username: "testuser",
            email: "test@example.com",
            verificationToken: verificationToken,
        });
        expect(jwt.sign).toHaveBeenCalledWith(
            userToken,
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith({
            msg: "Success! Please check your email for verification",
        });
    });
});
