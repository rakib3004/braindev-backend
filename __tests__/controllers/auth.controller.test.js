const authController = require("../../controllers/auth.controller");
const authService = require("../../services/auth.service");
const { newUserInfo } = require("../databases/auth.database");
const userValidationUtil = require("../../utils/user.validation.util");

const { AppError } = require("../../utils/error.handler.util");
const contentNegotiation = require("../../utils/content-negotiation.util");

describe("Testing Auth Controller: ", () => {
  describe("Testing registerUser Function: ", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("registerUser: Register User Successfully and return access token", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "test1234";

      const req = {
        body: {
          username: username,
          email: email,
          password: password,
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();

      const expectedInfo = {
        data: newUserInfo,
        token: "json-web-token",
      };

      const expectedResponse = {
        data: newUserInfo,
        message: "Registration is successful",
      };
      const body = req.body;

      jest.spyOn(authService, "registerUser").mockResolvedValue(expectedInfo);

      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await authController.registerUser(req, res, next);

      expect(authService.registerUser).toHaveBeenCalledWith(body);
      expect(res.cookie).toHaveBeenCalledWith("jwt", expectedInfo.token, {
        httpOnly: true,
      });

      expect(authService.registerUser).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);

      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("registerUser: Auth Service returns an error", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "test1234";

      const req = {
        body: {
          username: username,
          email: email,
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);

      await authController.registerUser(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("registerUser: Throw an App eror if email field is missing", async () => {
      const username = "test";
      const password = "test1234";
      const req = {
        body: {
          username: username,
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("Email field is empty", 400);

      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);

      jest
        .spyOn(userValidationUtil, "checkValidRegistration")
        .mockReturnValueOnce({ valid: false, message: "Email field is empty" });

      await authController.registerUser(req, res, next);
      expect(userValidationUtil.checkValidRegistration).toHaveBeenCalledTimes(
        1
      );
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("registerUser: Throw an App eror if email is not valid", async () => {
      const username = "test";
      const email = "test.cefalo.com";
      const password = "test1234";

      const req = {
        body: {
          username: username,
          email: email,
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("Email is not valid", 400);

      jest
        .spyOn(userValidationUtil, "checkValidRegistration")
        .mockReturnValueOnce({ valid: false, message: "Email is not valid" });

      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);

      await authController.registerUser(req, res, next);
      expect(userValidationUtil.checkValidRegistration).toHaveBeenCalledTimes(
        1
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("registerUser: Throw an app eror if request body is empty", async () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("Request body is empty", 400);

      jest
        .spyOn(userValidationUtil, "checkValidRegistration")
        .mockReturnValueOnce({
          valid: false,
          message: "Request body is empty",
        });
      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);

      await authController.registerUser(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    describe("Testing loginUser Function: ", () => {
      it("loginUser: User login Successfully", async () => {
        const username = "testuser";
        const password = "test1234";

        const req = {
          body: {
            username: username,
            password: password,
          },
        };
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedResponse = {
          message: "Login is successful",
        };

        const body = req.body;
        const token = "json-web-token";
        jest
          .spyOn(userValidationUtil, "checkValidLogin")
          .mockReturnValueOnce({ valid: true, message: "Ok" });

        jest.spyOn(authService, "loginUser").mockResolvedValue(token);

        jest
          .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
          .mockResolvedValue(expectedResponse);

        const response = await authController.loginUser(req, res, next);

        expect(authService.loginUser).toHaveBeenCalledWith(body);
        expect(res.cookie).toHaveBeenCalledWith("jwt", token, {
          httpOnly: true,
        });

        expect(authService.loginUser).toHaveBeenCalledTimes(1);
        expect(res.cookie).toHaveBeenCalledTimes(1);
        expect(
          contentNegotiation.sendResponseInContentNegotiation
        ).toHaveBeenCalledTimes(1);

        contentNegotiation.sendResponseInContentNegotiation.mockClear();
        expect(response).toBe(expectedResponse);
      });

      it("loginUser: Auth Service returns an error", async () => {
        const username = "test";
        const password = "test1234";

        const req = {
          body: {
            username: username,
            password: password,
          },
        };
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedError = new Error("Internal Server Error");

        jest
          .spyOn(authService, "loginUser")
          .mockRejectedValueOnce(expectedError);
        await authController.loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expectedError);
      });

      it("loginUser: Throw an App eror if request body is empty", async () => {
        const req = {};
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedError = new AppError("Request body is empty", 400);

        jest.spyOn(userValidationUtil, "checkValidLogin").mockReturnValueOnce({
          valid: false,
          message: "Request body is empty",
        });
        jest
          .spyOn(authService, "loginUser")
          .mockRejectedValueOnce(expectedError);

        await authController.loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expectedError);
      });

      it("loginUser: Throw an App eror if password is missing", async () => {
        const username = "testuser";

        const req = {
          body: {
            username: username,
          },
        };
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedError = new AppError("Password field is empty", 400);

        jest.spyOn(userValidationUtil, "checkValidLogin").mockReturnValueOnce({
          valid: false,
          message: "Password field is empty",
        });

        jest
          .spyOn(authService, "loginUser")
          .mockRejectedValueOnce(expectedError);

        await authController.loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expectedError);
      });

      it("loginUser: Throw an App eror if username is missing", async () => {
        const password = "test1234";

        const req = {
          body: {
            password: password,
          },
        };
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedError = new AppError("Username field is empty", 400);

        jest.spyOn(userValidationUtil, "checkValidLogin").mockReturnValueOnce({
          valid: false,
          message: "Username field is empty",
        });

        jest
          .spyOn(authService, "loginUser")
          .mockRejectedValueOnce(expectedError);

        await authController.loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
