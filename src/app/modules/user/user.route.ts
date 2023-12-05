import express from 'express';
import { UserController } from './user.controller';

import { studentValidationSchema } from '../students/student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema), // middleware
  UserController.createStudentController,
);

export const UserRoutes = router;
