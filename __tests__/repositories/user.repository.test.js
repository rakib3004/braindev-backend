const userRepository = require("../../repositories/user.repository");
const { usersList } = require("../databases/user.database");
const {User } = require("../../models");
const { AppError, SequelizeValidationError } = require("../../utils/error.handler.util");

describe("Testing User Repository: ", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("getAllUsers: Return an array of users: ", async () => {
      const offset = 1;
      const limit = 5;

      const expectedResponse = usersList.slice(offset, offset + limit);
      jest.spyOn(User, "findAll").mockResolvedValue(expectedResponse);

      const response = await userRepository.getAllUsers(offset,limit);
      expect(User.findAll).toHaveBeenCalledWith(
        {
          offset,
          limit,
          order: [['createdAt', 'DESC']]
        }
      );
      expect(User.findAll).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);


      expect(response).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                username: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }),
        ])
      );

    });

    it("getAllUsers: Throw an error for database query error", async () => {
      const offset = 1;
      const limit = 5;
      const expectedError = new Error("Internal Server Error");

      jest.spyOn(User, "findAll").mockRejectedValueOnce(expectedError);
      await expect(userRepository.getAllUsers(offset,limit)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing createUser Function: ", () => {
    it("createUser: create an user and return a user body: ", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "test";

      const expectedResponse = usersList[0];

      jest.spyOn(User, "create").mockResolvedValue(expectedResponse);
      const response = await userRepository.createUser(username, email, password);
    
      expect(User.create).toHaveBeenCalledWith({
        username: username,
        email: email,
        password: password,
      });
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

     it('createUser: Throw an error for database query error', async () => {

            const username = "test";
            const email =  "test@cefalo.com";
            const password = "testpassword";
            
      const expectedError = new Error("Internal Server Error");
      expectedError.errors = [{ message: "sequelize validation error" }];

      jest.spyOn(User, "create").mockRejectedValueOnce(expectedError);

      await expect(
        userRepository.createUser(username, email, password)
      ).rejects.toThrow(new SequelizeValidationError(expectedError, 400));
        
    }); 
  });

  describe("Testing getUserByUsername Function: ", () => {
    it("getUserByUsername: Return a user by username: ", async () => {
      const username = "testuser";
      const expectedResponse = usersList[0];
      jest.spyOn(User, "findOne").mockResolvedValue(expectedResponse);

      const response = await userRepository.getUserByUsername(username);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("getUserByUsername: Return 0 if the user does not exist", async () => {
      const username = "testuser";
      const expectedError = new AppError("User not found", 404);
      jest.spyOn(User, "findOne").mockRejectedValueOnce(expectedError);
      await expect(userRepository.getUserByUsername(username)).rejects.toThrow(
        expectedError
      );
    });

    it("getUserByUsername: Throw an error for database query error", async () => {
      const username = "testuser";
      const expectedError = new Error("Internal Server Error");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(expectedError);
      await expect(userRepository.getUserByUsername(username)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing updateUserPasswordByUsername Function: ", () => {
    it("updateUserPasswordByUsername: update a user password by username", async () => {
      const username = "testuser";
      const password = "testuserpassword";
      const updatedAt = "06-03-2023 05:04:23";
      const expectedResponse = [1];

      jest.spyOn(User, "update").mockResolvedValue(expectedResponse);

      const response = await userRepository.updateUserPasswordByUsername(
        password, updatedAt,username);

        expect(User.update).toHaveBeenCalledWith(  { password: password, updatedAt: updatedAt },
          { where: { username: username } });
      expect(User.update).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("updateUserPasswordByUsername: Throw an error for database query error", async () => {
      const username = "testuser";
      const password = "testuserpassword";
      const body = {
        password: password,
      };
      const expectedError = new Error("Internal Server Error");

      jest.spyOn(User, "update").mockRejectedValueOnce(expectedError);
      await expect(
        userRepository.updateUserPasswordByUsername(body, username)
      ).rejects.toThrow(expectedError);
    });
  });

  describe("Testing deleteUserByUsername Function: ", () => {
    it("deleteUserByUsername: delete a user by username: ", async () => {
      const username = "testuser";
      const expectedResponse = 1;

      jest.spyOn(User, "destroy").mockResolvedValue(expectedResponse);

      const response = await userRepository.deleteUserByUsername(username);

      expect(User.destroy).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("deleteUserByUsername: Throw an error for database query error", async () => {
      const id = "16514651474";

      const expectedError = new Error("Internal Server Error");

      jest.spyOn(User, "destroy").mockRejectedValueOnce(expectedError);

      await expect(userRepository.deleteUserByUsername(id)).rejects.toThrow(
        expectedError
      );
    });
  });
});
