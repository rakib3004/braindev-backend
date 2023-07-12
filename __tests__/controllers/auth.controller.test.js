const authController = require("../../controllers/auth.controller");
const authService = require("../../services/auth.service");
const { newUserInfo } = require("../databases/auth.database");

const contentNegotiation = require("../../utils/content-negotiation.util");

describe("Testing Auth Controller: ", () => {
  describe("Testing registerUser Function: ", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

      const  fullname  =  "Kazi Muktadir Ahmed";
      const  phoneNumber  =  "01529349128";
      const  email =   "kazi@gmail.com";
      const  password  =  "ilovemycomputer2";
      const  facultyName  =  "Engineering and Technology";
      const  departmentName  =  "Software Engineering";
      const  classRoll  =  "1111";
      const  registrationNumber  =  "2018325611";
      const  session  =  "2018-19";
      const  fatherName  =  "Abdul Muktadir";
      const  motherName  =  "Umme Muktadir";
      const  bloodGroup  =  "A+ve";
      const  religion  =  "Islam";
      const nationality  =  "Bangladeshi";
      const  presentAddress  =  "Azimpur, Dhaka - 1229";
      const  permanentAddress  =  "Vill: Shafipur, P.O: Shafipur, P.S: Kaliakoir, Zilla: Gazipur";
      const  hallName  =  "Fazlul Haque Muslim Hall";
      const  residentialType  =  "Non-residential";
    it("registerUser: Register User Successfully and return access token", async () => {
        const req = {
        body: {
          fullname: fullname,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          facultyName: facultyName,
          departmentName: departmentName,
          classRoll: classRoll,
          registrationNumber: registrationNumber,
          session: session,
          fatherName: fatherName,
          motherName: motherName,
          bloodGroup: bloodGroup,
          religion: religion,
          nationality: nationality,
          presentAddress: presentAddress,
          permanentAddress: permanentAddress,
          hallName: hallName,
          residentialType: residentialType,
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
      expect(res.cookie).toHaveBeenCalledWith("jwt", expectedInfo.token);

      expect(authService.registerUser).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);

      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("registerUser: Auth Service returns an error", async () => {
      const req = {
        body: {
          fullname: fullname,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          facultyName: facultyName,
          departmentName: departmentName,
          classRoll: classRoll,
          registrationNumber: registrationNumber,
          session: session,
          fatherName: fatherName,
          motherName: motherName,
          bloodGroup: bloodGroup,
          religion: religion,
          nationality: nationality,
          presentAddress: presentAddress,
          permanentAddress: permanentAddress,
          hallName: hallName,
          residentialType: residentialType,
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

  
    describe("Testing loginUser Function: ", () => {
      it("loginUser: User login Successfully", async () => {
        const email = "testuser@test.com";
        const password = "test1234";

        const req = {
          body: {
            email: email,
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

        jest.spyOn(authService, "loginUser").mockResolvedValue(token);

        jest
          .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
          .mockResolvedValue(expectedResponse);

        const response = await authController.loginUser(req, res, next);

        expect(authService.loginUser).toHaveBeenCalledWith(body);
        expect(res.cookie).toHaveBeenCalledWith("jwt", token);

        expect(authService.loginUser).toHaveBeenCalledTimes(1);
        expect(res.cookie).toHaveBeenCalledTimes(1);
        expect(
          contentNegotiation.sendResponseInContentNegotiation
        ).toHaveBeenCalledTimes(1);

        contentNegotiation.sendResponseInContentNegotiation.mockClear();
        expect(response).toBe(expectedResponse);
      });

      it("loginUser: Auth Service returns an error", async () => {
        const email = "testuser@test.com";
        const password = "test1234";

        const req = {
          body: {
            email: email,
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


    });
  });
});
