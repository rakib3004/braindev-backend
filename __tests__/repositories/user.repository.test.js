const userRepository = require("../../repositories/user.repository");
const { newUserInfo } = require("../databases/auth.database");
const User  = require("../../models/user.model");
const { AppError, SequelizeValidationError } = require("../../utils/error.handler.util");

describe("Testing User Repository: ", () => {

  describe("Testing createUser Function: ", () => {
    const  fullname  =  "Kazi Muktadir Ahmed";
    const  phoneNumber  =  "01529349128";
    const  email =   "kazi@gmail.com";
    const  password  =  "ilovemycomputer2";
    const  facultyName  =  "Engineering and Technology";
    const  departmentName  =  "Software Engineering";
    const  classRoll  =  "1111";
    const  registrationNumber  =  "2018325611";
    const  session  =  "2018-19";
    const  universityMeritPossitiion  =  "555";
    const  fatherName  =  "Abdul Muktadir";
    const  motherName  =  "Umme Muktadir";
    const  bloodGroup  =  "A+ve";
    const  religion  =  "Islam";
    const nationality  =  "Bangladeshi";
    const  presentAddress  =  "Azimpur, Dhaka - 1229";
    const  permanentAddress  =  "Vill: Shafipur, P.O: Shafipur, P.S: Kaliakoir, Zilla: Gazipur";
    const  hallName  =  "Fazlul Haque Muslim Hall";
    const  residentialType  =  "Non-residential";
    it("createUser: create an user and return a user body: ", async () => {
     

      const expectedResponse = newUserInfo;

      jest.spyOn(User, "create").mockResolvedValue(expectedResponse);
      const response = await userRepository.createUser(fullname,
        phoneNumber,
        email,
        password,
        facultyName,
        departmentName,
        classRoll,
        registrationNumber,
        session,
        universityMeritPossitiion,
        fatherName,
        motherName,
        bloodGroup,
        religion,
        nationality,
        presentAddress,
        permanentAddress,
        hallName,
        residentialType);
    
      expect(User.create).toHaveBeenCalledWith({
        fullname: fullname,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          facultyName: facultyName,
          departmentName: departmentName,
          classRoll: classRoll,
          registrationNumber: registrationNumber,
          session: session,
          universityMeritPossitiion: universityMeritPossitiion,
          fatherName: fatherName,
          motherName: motherName,
          bloodGroup: bloodGroup,
          religion: religion,
          nationality: nationality,
          presentAddress: presentAddress,
          permanentAddress: permanentAddress,
          hallName: hallName,
          residentialType: residentialType,
      });
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

     it('createUser: Throw an error for database query error', async () => {

          
            
      const expectedError = new Error("Internal Server Error");
      expectedError.errors = [{ message: "sequelize validation error" }];

      jest.spyOn(User, "create").mockRejectedValueOnce(expectedError);

      await expect(
        userRepository.createUser(fullname,
          phoneNumber,
          email,
          password,
          facultyName,
          departmentName,
          classRoll,
          registrationNumber,
          session,
          universityMeritPossitiion,
          fatherName,
          motherName,
          bloodGroup,
          religion,
          nationality,
          presentAddress,
          permanentAddress,
          hallName,
          residentialType)
      ).rejects.toThrow(new SequelizeValidationError(expectedError, 400));
        
    }); 
  });

  describe("Testing getUserByEmail Function: ", () => {
    it("getUserByUsername: Return a user by email: ", async () => {
      const email = "testuser@test.com";
      const expectedResponse = newUserInfo;
      jest.spyOn(User, "findOne").mockResolvedValue(expectedResponse);

      const response = await userRepository.getUserByEmail(email);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("getUserByUsername: Throw an error for database query error", async () => {
      const email = "testuser@test.com";
      const expectedError = new Error("Internal Server Error");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(expectedError);
      await expect(userRepository.getUserByEmail(email)).rejects.toThrow(
        expectedError
      );
    });
  });

});
