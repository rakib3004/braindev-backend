const userRepository = require("../../repositories/user.repository");
const { newUserInfo } = require("../databases/auth.database");
const User  = require("../../models/user.model");
const { AppError, SequelizeValidationError } = require("../../utils/error.handler.util");

describe("Testing User Repository: ", () => {


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
