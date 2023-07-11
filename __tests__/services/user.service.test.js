const userRepository = require("../../repositories/user.repository");
const userService = require("../../services/user.service");
const { AppError } = require("../../utils/error.handler.util");
const { newUserInfo } = require("../databases/auth.database");
const UserDTO = require("../../DTO/user.dto");
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
          };
                  
          const user = new UserDTO(newUserInfo);
          const expectedResponse = user;

            jest
              .spyOn(userRepository, 'createUser')
              .mockResolvedValue(expectedResponse);
            const response = await userService.createUser(body);
      
            expect(userRepository.createUser).toHaveBeenCalledTimes(1);
            expect(response).toStrictEqual(expectedResponse);     

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
          };    
        
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(userRepository, 'createUser')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.createUser(body)).rejects.toThrow(expectedError);

        });
    });

    describe('Testing getUserByUsername Function: ', () => {
        it('getUserByUsername: Return a user by username: ', async () => {

            const username = "test";
            const user = new UserDTO(fullUserList[0]);
            const expectedResponse = user;

            jest
              .spyOn(userRepository, 'getUserByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userService.getUserByUsername(username);

            expect(userRepository.getUserByUsername).toHaveBeenCalledWith(username);
            expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(response).toStrictEqual(expectedResponse);

        });

        it('getUserByUsername: Throw an error user not found if username does not exits', async () => {

          const username = "test";
            const expectedError = new AppError("User not found",404);
            jest.spyOn(userRepository, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.getUserByUsername(username)).rejects.toThrow(expectedError);

        });

        it('getUserByUsername: Throw an error if the userRepository call fails', async () => {
          const username = "test";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(userRepository, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);
              await expect(userService.getUserByUsername(username)).rejects.toThrow(expectedError);

        });
    });

    describe('Testing getUserLoginInfo Function: ', () => {
        it('getUserLoginInfo: Return a user by username: ', async () => {
          
          const username = "test";
            const expectedResponse = {

                       id: "bced7494-b4e2-488c-8f79-8e1cc0b29883",
                       username: "raghib",
                       email: "raghib@cefalo.com",
                       password: "$hashpassword$",
                       createdAt: "2023-04-03T02:30:27.000Z",
                       updatedAt: "2023-04-03T02:30:27.000Z"
                   
               };
      
            jest
              .spyOn(userRepository, 'getUserByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userService.getUserLoginInfo(username);

            expect(userRepository.getUserByUsername).toHaveBeenCalledWith(username);
            expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
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


    describe('Testing updateUserPasswordByUsername Function: ', () => {
        it('updateUserPasswordByUsername: update a user password by username and return a user response ', async () => {
            
           const username = "testuser";
          const password = "changedpassword";
          
            const body = {
                password :password,
            };
            const expectedResponse = [1];

            const hashPassword = '$c$h$a$n$g$e$p$a$s$s$w$o$r$d'
            
            jest
              .spyOn(userValidationUtil, 'generateHashPassword')
              .mockReturnValue(hashPassword);

            jest
              .spyOn(userRepository, 'updateUserPasswordByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userService.updateUserPasswordByUsername(body, username);

            expect(userRepository.updateUserPasswordByUsername).toHaveBeenCalledTimes(1);
            expect(response).toEqual(expectedResponse);


        });

       it('updateUserPasswordByUsername: Throw an error if the userRepository call fails', async () => {
            const id = "16514651474";
            const password = "changedpassword";
           const body = {
                password :password,
            };
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(userRepository, 'updateUserPasswordByUsername')
              .mockRejectedValueOnce(expectedError);

              await expect(userService.updateUserPasswordByUsername(body,id)).rejects.toThrow(expectedError);

        });
    });


    describe('Testing deleteUserByUsername Function: ', () => {
        it('deleteUserByUsername: delete a user by username ', async () => {
            const username = "test";
            const expectedResponse = 1;

            jest
              .spyOn(userRepository, 'deleteUserByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userService.deleteUserByUsername(username);
      
            expect(userRepository.deleteUserByUsername).toBeCalledWith(username);
            expect(userRepository.deleteUserByUsername).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });

        it('deleteUserByUsername: Throw an error if the userRepository call fails', async () => {
          const username = "test";
           
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(userRepository, 'deleteUserByUsername')
              .mockRejectedValueOnce(expectedError);

              await expect(userService.deleteUserByUsername(username)).rejects.toThrow(expectedError);

        });
    });

});
