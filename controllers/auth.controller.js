const authService = require("../services/auth.service");
// const userValidationUtil = require("../utils/user.validation.util");
// const { AppError } = require("../utils/error.handler.util");
const contentNegotiation = require("../utils/content-negotiation.util");


exports.registerUser = async (req, res, next) => {

  try {
    body = req.body;
    const registerUserResponse = await authService.registerUser(body);

    res.cookie("jwt", registerUserResponse.token);

    const clientResponse = { data: registerUserResponse.data, message: "Registration is successful" }

    return contentNegotiation.sendResponseInContentNegotiation(req, res, 201, clientResponse);

  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {

  try {
    // const body = req.body;
    // const validLogin = userValidationUtil.checkValidLogin(body);
    // if (!validLogin.valid) {
    //   throw new AppError(validLogin.message, 400);
    // }

    const loginUserResponse = await authService.loginUser(body);

    res.cookie("jwt", loginUserResponse);

    const clientResponse = { message: "Login is successful" };

    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, clientResponse);

  } catch (err) {
    console.error(err);
    next(err);
  }
};


