const userRepository = require("../repositories/user.repository");
const UserDTO = require("../utils/user.dto");
const userValidationUtil = require("../utils/user.validation.util");
const userNotFoundMessage = 'User not found';
const { AppError } = require("../utils/error.handler.util");


exports.createUser = async (body) => {
  const fullname = body.fullname;
  const phoneNumber = body.phoneNumber;
  const email = body.email;
  const facultyName = body.facultyName;
  const departmentName = body.departmentName;
  const classRoll = body.classRoll;
  const registrationNumber = body.registrationNumber;
  const session = body.session;
  const fatherName = body.fatherName;
  const motherName = body.motherName;
  const bloodGroup = body.bloodGroup;
  const religion = body.religion;
  const nationality = body.nationality;
  const presentAddress = body.presentAddress;
  const permanentAddress = body.permanentAddress;
  const hallName = body.hallName;
  const residentialType = body.residentialType;
  const password = await userValidationUtil.generateHashPassword(body.password);

  const newUser = await userRepository.createUser(
     fullname,
     phoneNumber,
     email,
     password,
     facultyName,
     departmentName,
     classRoll,
     registrationNumber,
     session,
     fatherName,
     motherName,
     bloodGroup,
     religion,
     nationality,
     presentAddress,
     permanentAddress,
     hallName,
     residentialType,
  );

  const dtoUser = new UserDTO(newUser);
  return dtoUser;
};

exports.getUserByEmail = async (email) => {
  const userResponse = await userRepository.getUserByEmail(email);

  if (!userResponse) {
    throw new AppError(userNotFoundMessage, 404);
  }
  const dtoUser = new UserDTO(userResponse);
  return dtoUser;

};



exports.getUserLoginInfo = async (email) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError(userNotFoundMessage, 404);
  }
  return user;

};

