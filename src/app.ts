import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application Routes
// application routes
app.use('/api/v1', router);

// Default
app.get('/', (req: Request, res: Response) => {
  res.send('University Management Auth Server');
});

// Global Error Handler
app.use(globalErrorHandler);

//Not Found Routing
app.use(notFound);

export default app;
