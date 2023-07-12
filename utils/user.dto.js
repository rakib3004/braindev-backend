class SingleUserDTO {
    constructor(user) {
      const userDtoSingleObject = {
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      facultyName: user.facultyName,
      departmentName: user.departmentName,
      classRoll: user.classRoll,
      registrationNumber: user.registrationNumber,
      session: user.session,
      fatherName: user.fatherName,
      motherName: user.motherName,
      bloodGroup: user.bloodGroup,
      religion: user.religion,
      nationality: user.nationality,
      presentAddress: user.presentAddress,
      permanentAddress: user.permanentAddress,
      hallName: user.hallName,
      residentialType: user.residentialType,
      };
      this.user = userDtoSingleObject;
    }
  }
  
  module.exports = SingleUserDTO;
  