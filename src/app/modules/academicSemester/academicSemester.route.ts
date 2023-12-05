import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ), // middleware
  AcademicSemesterControllers.createAcademicSemesterController,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemestersController);

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemesterController,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemesterController,
);

export const AcademicSemesterRoute = router;
