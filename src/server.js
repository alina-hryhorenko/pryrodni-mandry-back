import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import helmet from 'helmet';
import storiesRoutes from './routes/storiesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [],
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(logger);

// Routes
app.use('/api', storiesRoutes);


// Error Handlers
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
await connectMongoDB();

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
