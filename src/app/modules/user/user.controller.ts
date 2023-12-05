import { UserSevices } from './user.services';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';

const createStudentController = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserSevices.createStudentService(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

export const UserController = {
  createStudentController,
};
