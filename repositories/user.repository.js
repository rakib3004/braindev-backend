const User = require("../models/user.model");
const { SequelizeValidationError } = require("../utils/error.handler.util");

exports.getAllUsers = async (t) => {
  const users = await User.findAll(
    {
      order: [['createdAt', 'DESC']]
    }
  );
  return users;
};

exports.createUser = async (   fullname,
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
    residentialType,) => {
  try {
    const user = await User.create({
     fullname:fullname,
     phoneNumber:phoneNumber,
     email:email,
     password:password,
     facultyName:facultyName,
     departmentName:departmentName,
     classRoll:classRoll,
     registrationNumber:registrationNumber,
     session:session,
     universityMeritPossitiion:universityMeritPossitiion,
     fatherName:fatherName,
     motherName:motherName,
     bloodGroup:bloodGroup,
     religion:religion,
     nationality:nationality,
     presentAddress:presentAddress,
     permanentAddress:permanentAddress,
     hallName:hallName,
     residentialType:residentialType,

    });
    return user;
  } catch (error) {
    throw new SequelizeValidationError(error, 400);
  }
};

exports.getUserByPhoneNumber = async (username) => {
  const user = await User.findOne({
    where: {
      phoneNumber: phoneNumber,
    },
  });
  return user;
};


exports.updateUserPasswordByUsername = async (password,
  updatedAt,
  username) => {

  const user = await User.update(
    { password: password, updatedAt: updatedAt },
    { where: { username: username } }
  );
  return user;

};
