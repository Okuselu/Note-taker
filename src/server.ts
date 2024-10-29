import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.config';
import noteRoutes from './routes/note.routes';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors())
connectDB();
app.use('/api', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
