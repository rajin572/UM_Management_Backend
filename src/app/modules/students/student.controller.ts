import { StudentService } from './student.services';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';

const getUserController = catchAsync(async (req, res) => {
  const result = await StudentService.getUserService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Student succesfull',
    data: result,
  });
});

const getUserByIDController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getUserByIDService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Get Student Data succesfully',
    success: true,
    data: result,
  });
});

const DeleteUserByIDController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.DeleteUserByIDService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const StudentController = {
  getUserController,
  getUserByIDController,
  DeleteUserByIDController,
};
