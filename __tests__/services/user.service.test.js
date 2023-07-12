const userRepository = require("../../repositories/user.repository");
const userService = require("../../services/user.service");
const { AppError } = require("../../utils/error.handler.util");
const { newUserInfo, userLoginInfo } = require("../databases/auth.database");
const UserDTO = require("../../utils/user.dto");
const userValidationUtil = require("../../utils/user.validation.util");

describe('Testing User Service: ', () => {
   

    describe('Testing createUser Function: ', () => {

      
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

        it('createUser: Create an user and return a user response: ', async () => {

     
          
          const body = {
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
          };
                  
          const user = new UserDTO(newUserInfo);
          const expectedResponse = user;

            jest
              .spyOn(userRepository, 'createUser')
              .mockResolvedValue(expectedResponse);
            const response = await userService.createUser(body);
      
            expect(userRepository.createUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);     

        });

        it('createUser: Throw an error if the userRepository call fails', async () => {

          const body = {
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
          };    
        
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(userRepository, 'createUser')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.createUser(body)).rejects.toThrow(expectedError);

        });
    });

    describe('Testing getUserByEmail Function: ', () => {
        it('getUserByUsername: Return a user by email: ', async () => {

            const email = "testuser@test.com";
            const user = new UserDTO(newUserInfo);
            const expectedResponse = user;

            jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockResolvedValue(expectedResponse);
            
            const response = await userService.getUserByEmail(email);

            expect(userRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse); 

        });

        it('getUserByUsername: Throw an error user not found if username does not exits', async () => {

          const email = "testuser@test.com";
          const expectedError = new AppError("User not found",404);
            jest.spyOn(userRepository, 'getUserByEmail')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.getUserByEmail(email)).rejects.toThrow(expectedError);

        });

        it('getUserByUsername: Throw an error if the userRepository call fails', async () => {
          const email = "testuser@test.com";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.getUserByEmail(email)).rejects.toThrow(expectedError);

        });
    });

    describe('Testing getUserLoginInfo Function: ', () => {
        it('getUserLoginInfo: Return a user by username: ', async () => {
          
          const email = "testuser@test.com";
         
      
            jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockResolvedValue(userLoginInfo);
            
            const response = await userService.getUserLoginInfo(email);

            expect(userRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });

        it('getUserLoginInfo: Throw an error user not found if username does not exits', async () => {
          const username = "test";
            const expectedError = new AppError("User not found",404);
            jest
              .spyOn(userRepository, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.getUserLoginInfo(username)).rejects.toThrow(expectedError);

        });

        it('getUserLoginInfo: Throw an error if the userRepository call fails', async () => {
          const username = "test";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(userRepository, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);

              await expect(userService.getUserLoginInfo(username)).rejects.toThrow(expectedError);

        });
    });

});
