import express from 'express';
import { StudentController } from './student.controller';

const studentRoute = express.Router();

studentRoute.get('/', StudentController.getUserController);
studentRoute.get('/:id', StudentController.getUserByIDController);
studentRoute.delete('/:id', StudentController.DeleteUserByIDController);
studentRoute.post('/create', StudentController.createUserController);

export default studentRoute;
