import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import userRoutes from './routes/userRoutes';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI as string;

// Enable CORS for all routes, or configure it for specific origins
app.use(cors());

// Add this line to parse JSON request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add error handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('¡Something broke!');
});

// Add logs 
app.use((req, res, next) => console.log({
  msg: 'Request: ',
  date: Date.now(),
  method: req.method,
  path: req.path
}) as unknown as undefined || next());

(async () => {
  try {
    const client = await MongoClient.connect(mongoUri);

    console.log({
      msg: 'Connected to MongoDB',
      data: { uri: mongoUri }
    });

    app.locals.db = client.db();

    const userService = new UserService();
    const userController = new UserController(userService);
    app.use('/api/users', userRoutes(userController));

    app.listen(port, () => console.log({
      msg: `Server running on port`,
      data: { port }
    }));
  }
  catch (err) {
    console.error({
      msg: "MongoDB connection error",
      data: { uri: mongoUri },
      error: err
    });
  }
})();

export default app;