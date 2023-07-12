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
    const singleUser =  new User({
      fullname: fullname,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      facultyName: facultyName,
      departmentName: departmentName,
      classRoll: classRoll,
      registrationNumber: registrationNumber,
      session: session,
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

   const newUser = await singleUser.save();
  return newUser;
    
  } catch (error) {
    console.log(error);
   // throw new Error("Database Error when creating user");
  }
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
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
  universityMeritPosition,
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
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      fullname: fullname,
      phoneNumber: phoneNumber,
      password: password,
      facultyName: facultyName,
      departmentName: departmentName,
      classRoll: classRoll,
      registrationNumber: registrationNumber,
      session: session,
      universityMeritPosition: universityMeritPosition,
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
    { new: true }
  );
  return user;
};
