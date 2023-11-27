import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import studentRoute from './app/modules/students/student.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application Routes

app.use('/api/v1/students', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('My Practice Project');
});
//Not Found Routing
app.use('*', (req: Request, res: Response) => {
  res.status(400).json({
    status: false,
    massage: 'Route Not Found',
  });
});
export default app;
