import { Request, Response } from 'express';
import { StudentService } from './student.services';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUserController = async (req: Request, res: Response) => {
  try {
    const studentData = await req.body;
    //Joi Validation Data
    // const { error, value } = studentValidationSchema.validate(studentData);

    //Zod validation data
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await StudentService.createUserService(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student is created unsuccesfull',
      error: error,
    });
  }
};

const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getUserService();

    res.status(200).json({
      success: true,
      message: 'Get All Student succesfull',
      count: result.length,
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Get All Student unsuccesfull',
      error: error,
    });
  }
};

const getUserByIDController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentService.getUserByIDService(id);

    res.status(200).json({
      success: true,
      message: 'Get Student Data succesfully',
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Get All Student unsuccesfull',
      error: error,
    });
  }
};

const DeleteUserByIDController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentService.DeleteUserByIDService(id);

    res.status(200).json({
      success: true,
      message: 'Get Student Data succesfully',
      result: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Get All Student unsuccesfull',
      error: error,
    });
  }
};

export const StudentController = {
  createUserController,
  getUserController,
  getUserByIDController,
  DeleteUserByIDController,
};
