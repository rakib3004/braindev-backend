const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
const { AppError } = require("../utils/error.handler.util");


exports.registerUser = async (body) => {

  const newUserResponse = await userService.createUser(body);

  const username = newUserResponse.user.username;
  const token = await authUtil.generateJwtToken(
    username
  );
  return { data: newUserResponse, token: token };
};


exports.loginUser = async (body) => {
  const email = body.email;
  const userResponse = await userService.getUserLoginInfo(email);

  const password = body.password;
  const user = userResponse;
  const storedHashPassword = user.password;
  const isValidPassword = await authUtil.comparePassword(
    password,
    storedHashPassword
  );

  if (isValidPassword) {
    const username = userResponse.username;
    const token = await authUtil.generateJwtToken(username);
    return token;
  }
  throw new AppError('Authentication Failed', 401);

};

