import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI as string;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

export default app;
