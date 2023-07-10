const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
const { AppError } = require("../utils/error.handler.util");


exports.registerUser = async (body) => {

  const newUserResponse = await userService.createUser(body);

  const email = newUserResponse.user.email;
  const token = await authUtil.generateJwtToken(
    email
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
    const email = userResponse.email;
    const token = await authUtil.generateJwtToken(email);
    return token;
  }
  throw new AppError('Authentication Failed', 401);

};

