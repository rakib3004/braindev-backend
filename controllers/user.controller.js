const contentNegotiation = require("../utils/content-negotiation.util");
const userService = require("../services/user.service")

exports.getUserByEmail = async (req, res, next) => {
    try {
      const email = req.params.email;
      const userResponse = await userService.getUserByEmail(
        email
      );
  
      return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, userResponse);
    } catch (err) {
      next(err);
    }
  };