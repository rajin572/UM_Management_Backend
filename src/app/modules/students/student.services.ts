import { Student } from './student.model';
import { TStudent } from './students.interface';

const createUserService = async (studentData: TStudent) => {
  // Custome Static  method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = Student.create(studentData); //Built in static method

  // Custome Instance method
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }
  // const result = await student.save();   // Built in instance method
  return result;
};
const getUserService = async () => {
  const result = Student.find();
  return result;
};
const getUserByIDService = async (id: string) => {
  const result = Student.findOne({ id });
  return result;
};

const DeleteUserByIDService = async (id: string) => {
  const result = Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createUserService,
  getUserService,
  getUserByIDService,
  DeleteUserByIDService,
};
