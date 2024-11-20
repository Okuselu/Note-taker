import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.config';
import noteRoutes from './routes/note.routes';
import authRoutes from './routes/auth.routes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

try {
  connectDB();
} catch (error) {
  console.error('Database connection error:', error);
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Route middleware
app.use('/api', noteRoutes);
app.use('/api/auth', authRoutes); 

// Global error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// import express, { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.config';
// import noteRoutes from './routes/note.routes';


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api', noteRoutes);

// // Global error handling middleware
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });



// import express, { Request, Response, NextFunction } from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.config";
// import noteRoutes from "./routes/note.routes";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use("/api", noteRoutes);

// // Global error handling middleware
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });



// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors'
// import connectDB from './config/db.config';
// import noteRoutes from './routes/note.routes';

// dotenv.config(); 

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// app.use(cors())
// app.use(express.json()); 

// app.use('/api', noteRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });
