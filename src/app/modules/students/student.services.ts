import { Student } from './student.model';

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
  getUserService,
  getUserByIDService,
  DeleteUserByIDService,
};
