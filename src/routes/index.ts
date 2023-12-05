import { Router } from 'express';
import { UserRoutes } from '../app/modules/user/user.route';
import studentRoute from '../app/modules/students/student.route';
import { AcademicSemesterRoute } from '../app/modules/academicSemester/academicSemester.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
