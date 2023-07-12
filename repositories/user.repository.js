const User = require("../models/user.model");

exports.createUser = async (
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
  residentialType
) => {
  try {
    const user = await User.create({
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
    });
    return user;
  } catch (error) {
    new Error("Database Error when creating user");
  }
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  return user;
};

exports.updateUserPasswordByUsername = async (
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
  residentialType
) => {
  const user = await User.update(
    {
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
    },
    { where: { email: email } }
  );
  return user;
};
