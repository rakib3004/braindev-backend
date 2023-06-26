const userRepository = require("../repositories/user.repository");
const UserDTO = require("../DTO/user.dto");
const userValidationUtil = require("../utils/user.validation.util");
// const paginationUtil = require("../utils/pagination.util");
const userNotFoundMessage = 'User not found';
const { AppError } = require("../utils/error.handler.util");


exports.getAllUsers = async (query) => {

//   const pageNumber = paginationUtil.getPageNumber(query.page);
//   const pageSize = paginationUtil.getPageSize(query.limit);
//   const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
//   const pageLimit = paginationUtil.getPageLimit(pageSize);

  const users = await userRepository.getAllUsers();
//   const dtoUsers = [];
//   users.forEach((user) => {
//     const dtoUser = new UserDTO(user);
//     dtoUsers.push(dtoUser);
//   });
  return users;

};

exports.createUser = async (body) => {

  const fullname = body.fullname;
  const phoneNumber = body.phoneNumber;
  const email = body.email;
  const facultyName = body.facultyName;
  const departmentName = body.departmentName;
  const classRoll = body.classRoll;
  const registrationNumber = body.registrationNumber;
  const session = body.session;
  const universityMeritPossitiion = body.universityMeritPossitiion;
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
     universityMeritPossitiion,
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

exports.getUserByUsername = async (usernameParameter) => {
  const username = usernameParameter.toLowerCase();
  const validParameter = userValidationUtil.checkValidUsername(username);

  if (!validParameter.valid) {
    throw new AppError(validParameter.message, 400);
  }

  const userResponse = await userRepository.getUserByUsername(username);

  if (!userResponse) {
    throw new AppError(userNotFoundMessage, 404);
  }

  const dtoUser = new UserDTO(userResponse);
  return dtoUser;

};

exports.getUserByUserId = async (userId) => {
  const userResponse = await userRepository.getUserByUserId(userId);

  if (!userResponse) {
    throw new AppError(userNotFoundMessage, 404);
  }
  const dtoUser = new UserDTO(userResponse);
  return dtoUser;
};

exports.getUserLoginInfo = async (usernameParameter) => {
  const username = usernameParameter.toLowerCase();
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    throw new AppError(userNotFoundMessage, 404);
  }
  return user;

};

exports.updateUserPasswordByUsername = async (body, usernameParameter) => {
  const username = usernameParameter.toLowerCase();

  const password = await userValidationUtil.generateHashPassword(body.password);
  const updatedAt = Date.now();
  const updatedUserResponse = userRepository.updateUserPasswordByUsername(
    password,
    updatedAt,
    username
  );

  return updatedUserResponse;

};

exports.deleteUserByUsername = async (usernameParameter) => {

  const username = usernameParameter.toLowerCase();
  const deletedUserResponse = userRepository.deleteUserByUsername(username);
  return deletedUserResponse;

};

