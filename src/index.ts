import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI as string;

app.use(bodyParser.json());

MongoClient.connect(mongoUri)
  .then(client => {
    console.log('Connected to MongoDB');
    app.locals.db = client.db();

    const userService = new UserService();
    const userController = new UserController(userService);
    app.use('/api/users', userRoutes(userController));

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

export default app;