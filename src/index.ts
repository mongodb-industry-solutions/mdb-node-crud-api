import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import userRoutes from './routes/userRoutes';
import sysRouter from './routes/sysRouter';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI as string;

// Enable CORS for all routes, or configure it for specific origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true  // 🔥 Esto es clave
}));

// Add logs 
app.use((req, res, next) => console.log({
  msg: 'Request: ',
  date: Date.now(),
  method: req.method,
  path: req.path
}) as unknown as undefined || next());

// Add this line to parse JSON request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add error handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('¡Something broke!');
});

(async () => {
  try {
    // Connect to the database 
    const client = await MongoClient.connect(mongoUri);
    app.locals.db = client.db();

    console.log({
      msg: 'Connected to MongoDB',
      data: { uri: mongoUri }
    });

    // System module router
    app.use('/', sysRouter());

    // User module router
    const userService = new UserService();
    const userController = new UserController(userService);
    app.use('/api/users', userRoutes(userController));

    // Start the HTTP server 
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